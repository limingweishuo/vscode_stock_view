import * as vscode from 'vscode';

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
