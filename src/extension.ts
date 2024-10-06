import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension is now active!');

	// 定义不同视图的数据源
	const helloworldView = vscode.window.createTreeView('helloworld-view', { treeDataProvider: new MyTreeDataProvider('Hello World Content') });
	const view1 = vscode.window.createTreeView('view1', { treeDataProvider: new MyTreeDataProvider('Content for View 1') });
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

// 功能一
function featureOne() {
    vscode.window.showInformationMessage('Feature One is running!');
}

// 功能二
function featureTwo() {
    vscode.window.showInformationMessage('Feature Two is running!');
}

export function deactivate() {}
