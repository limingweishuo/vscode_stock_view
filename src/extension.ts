import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension is now active!');

	// 定义不同视图的数据源
	const helloworldView = vscode.window.createTreeView('helloworld-view', { treeDataProvider: new MyTreeDataProvider('Hello World Content') });
	const view1 = vscode.window.createTreeView('view1', { treeDataProvider: new SampleTreeDataProvider() });

	// 注册点击事件
	view1.onDidChangeSelection(event => {
        const selectedItem = event.selection[0];
        if (selectedItem && selectedItem.label) {
            openWebview(context, typeof selectedItem.label === 'string' ? selectedItem.label : selectedItem.label.label);
        }
	});
	// const view2 = vscode.window.createTreeView('view2', { treeDataProvider: new MyTreeDataProvider('Content for View 2') });
	// const view3 = vscode.window.createTreeView('view3', { treeDataProvider: new MyTreeDataProvider('Content for View 3') });

	// 将这些视图添加到 context 中
	// context.subscriptions.push(helloworldView, view1, view2, view3);
	context.subscriptions.push(helloworldView, view1);

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
}

// 自定义 TreeDataProvider 用于提供数据
class MyTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
        return [
            new vscode.TreeItem(this.content),
            new vscode.TreeItem('More items here...'),
        ];
    }
}

// 给view1添加tree item
class SampleTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(): vscode.ProviderResult<vscode.TreeItem[]> {
        return [
            new vscode.TreeItem("View Table 1"),
            new vscode.TreeItem("View Table 2")
        ];
    }
}

// 打开 Webview 显示表格
function openWebview(context: vscode.ExtensionContext, label: string) {
    const panel = vscode.window.createWebviewPanel(
        'tableView',
        label,
        vscode.ViewColumn.One,
        {}
    );

    // HTML 表格内容
    panel.webview.html = getTableContent(label);
}

// 根据选项生成表格内容
function getTableContent(label: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${label}</title>
        <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>${label}</h1>
        <table>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
            </tr>
            <tr>
                <td>Row 1, Col 1</td>
                <td>Row 1, Col 2</td>
                <td>Row 1, Col 3</td>
            </tr>
            <tr>
                <td>Row 2, Col 1</td>
                <td>Row 2, Col 2</td>
                <td>Row 2, Col 3</td>
            </tr>
        </table>
    </body>
    </html>`;
}

// 功能一
function featureOne() {
    vscode.window.showInformationMessage('Feature One is running!');
}

// 功能二
function featureTwo() {
    vscode.window.showInformationMessage('Feature Two is running!');
}

export function deactivate() {}
