import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension is now active!');

    // 注册 command1，绑定到 featureOne
    const command1 = vscode.commands.registerCommand('extension.command1', () => {
        featureOne();
    });

    // 注册 command2，绑定到 featureTwo
    const command2 = vscode.commands.registerCommand('extension.command2', () => {
        featureTwo();
    });

    // 将命令加入 context.subscriptions 中，以确保插件被释放时注销
    context.subscriptions.push(command1, command2);

	// 注册第一个视图
	const viewOneProvider = new ViewProvider(context.extensionUri, 'viewOne', 'viewOne.html');
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('viewOne', viewOneProvider)
	);

	// 注册第二个视图
	const viewTwoProvider = new ViewProvider(context.extensionUri, 'viewTwo', 'viewTwo.html');
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('viewTwo', viewTwoProvider)
	);
}

// 功能一
function featureOne() {
    vscode.window.showInformationMessage('Feature One is running!');
}

// 功能二
function featureTwo() {
    vscode.window.showInformationMessage('Feature Two is running!');
}

class ViewProvider implements vscode.WebviewViewProvider {
    constructor(
        private readonly extensionUri: vscode.Uri,
        private readonly viewId: string,
        private readonly htmlFileName: string
    ) {}

    resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        // 从 HTML 文件加载内容
        const htmlContent = this.getHtmlContent(webviewView.webview, this.htmlFileName);
        webviewView.webview.html = htmlContent;
    }

    private getHtmlContent(webview: vscode.Webview, htmlFileName: string): string {
        // 获取 HTML 文件路径
        const htmlPath = path.join(this.extensionUri.fsPath, 'src', 'static', 'views', htmlFileName);
        
        // 读取 HTML 文件内容
        let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        // 替换相对路径为 Webview URI
        htmlContent = htmlContent.replace(
            /src=["']([^"']+)["']/g,
            (match, srcPath) => {
                const fileUri = vscode.Uri.file(path.join(this.extensionUri.fsPath, 'src', 'static', 'views', srcPath));
                return `src="${webview.asWebviewUri(fileUri)}"`;
            }
        );

        return htmlContent;
    }
}

export function deactivate() {}
