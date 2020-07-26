# mfcpack 使用

> [**mfcpack**](https://github.com/hans000/mfcpack) is a packer that can compile TS files into mcfunction files for minecraft. Its main purpose is to convert JavaScript files into mcfunction files and output any static resources or assets. This doesn't mean it's a compiler, it's just converting JavaScript output into mcfunction files.

## 如何使用

1. 环境安装

安装[node](http://nodejs.cn/)，确保你的**node**版本在10.x以上

2. 克隆当前的工程

你可以点击右上角的`fork`，添加到自己的仓库，也可以直接`clone`命令（确保安装了git），或者可以直接下载压缩文件
```
git clone https://github.com/hans000/mfcpack-demo.git
```

3. 安装依赖
```
npm i
npm run pack
```

## 目录说明

- assets/ 存放json文件
- datapack/ 会把.ts编译成.mcfunction文件
- index.ts 编译入口，自动生成，请勿修改

## 其他

mfcpack 仅作为编译工具，你可以按约定书写.ts文件，它会把.ts文件转换成.mcfunction文件，因此你可以使用ts逻辑自己常用的逻辑，minecraft类库还在开发中，敬请期待。