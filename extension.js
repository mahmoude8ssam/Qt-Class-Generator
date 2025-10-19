const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.createQtClass', async function () {
    const className = await vscode.window.showInputBox({ prompt: 'Enter class name (e.g. HomeWidget)' });
    if (!className) return;

    const folderUri = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      openLabel: 'Select target folder'
    });
    if (!folderUri || folderUri.length === 0) return;

    const targetDir = path.join(folderUri[0].fsPath, className);
    fs.mkdirSync(targetDir, { recursive: true });

    const hPath = path.join(targetDir, `${className}.h`);
    const cppPath = path.join(targetDir, `${className}.cpp`);
    const priPath = path.join(targetDir, `${className}.pri`);

    // Basic class template with #pragma once
    const hContent = `#pragma once

#include <QWidget>

class ${className} : public QWidget {
    Q_OBJECT

public:
    explicit ${className}(QWidget *parent = nullptr);
};
`;

    const cppContent = `#include "${className}.h"

${className}::${className}(QWidget *parent) : QWidget(parent) {
    // TODO: UI setup
}
`;

    const priContent = `HEADERS += \\
    $$PWD/${className}.h

SOURCES += \\
    $$PWD/${className}.cpp
`;

    fs.writeFileSync(hPath, hContent);
    fs.writeFileSync(cppPath, cppContent);
    fs.writeFileSync(priPath, priContent);

    // البحث عن project.pro في root المشروع
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const rootPro = path.join(workspaceFolders[0].uri.fsPath, 'project.pro');
      if (fs.existsSync(rootPro)) {
        fs.appendFileSync(rootPro, `\ninclude(${className}/${className}.pri)\n`);
      } else {
        vscode.window.showWarningMessage('لم يتم العثور على project.pro في root المشروع.');
      }
    }

    vscode.window.showInformationMessage(`Qt class "${className}" created successfully!`);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
