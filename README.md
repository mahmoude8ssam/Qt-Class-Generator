# Qt Class Generator

**Qt Class Generator** is a Visual Studio Code extension that allows you to quickly create **Qt class folders** with `.h`, `.cpp`, and `.pri` files. It also organizes the files into a folder with the class name and automatically updates your `project.pro`.

## Features

- Creates a **Header file (`.h`)** with `#pragma once`.
- Creates a **CPP file (`.cpp`)** ready for implementation.
- Creates a **PRI file (`.pri`)** and prepares it for inclusion in your Qt project.
- Generates a **folder named after the class** containing all files.
- Automatically updates your Qt project (`project.pro`) with `include()` for the new PRI file.
- Saves time when creating new Qt classes.

## Installation

1. Open **Visual Studio Code**.
2. Go to **Extensions** (`Ctrl+Shift+X`).
3. Search for **Qt Class Generator** or use the [Marketplace link](https://marketplace.visualstudio.com/items?itemName=MahmoudEssam.qt-class-generator).
4. Click **Install**.

> You can also install the extension from a `.vsix` file if you exported it manually.

## Usage

1. Press **`Ctrl+Shift+P`** to open the **Command Palette**.
2. Search for **`Create Qt Class`** and run it.
3. Enter the class name (e.g., `HomeWidget`).
4. Choose the target folder where you want the folder and files to be created.
5. The following files will be created inside a folder with the class name:
```
HomeWidget/
  ├── HomeWidget.h
  ├── HomeWidget.cpp
  └── HomeWidget.pri
```
6. If a `project.pro` file exists in the selected folder, the following line will be added automatically:
```pro
include(HomeWidget/HomeWidget.pri)
```

## Generated Files Example

### HomeWidget.h
```cpp
#pragma once
#include <QWidget>

class HomeWidget : public QWidget {
    Q_OBJECT
public:
    explicit HomeWidget(QWidget *parent = nullptr);
};
```

### HomeWidget.cpp
```cpp
#include "HomeWidget.h"

HomeWidget::HomeWidget(QWidget *parent) : QWidget(parent) {
    // TODO: UI setup
}
```

### HomeWidget.pri
```pro
HEADERS += \
    $$PWD/HomeWidget.h

SOURCES += \
    $$PWD/HomeWidget.cpp
```

## Contributing

If you want to contribute or suggest improvements:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and push to your branch.
4. Open a pull request with a clear description of your changes.


## Links

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=MahmoudEssam.qt-class-generator)
- [GitHub Repository](https://github.com/mahmoude8ssam/Qt-Class-Generator)
