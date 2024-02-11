## Unprettier
<div style="display:flex">
  <img style="margin-right:20px" src="https://img.shields.io/badge/license-MIT-green"></img>
  <img src="https://img.shields.io/badge/author-shishikami-blue"></img>
</div>

</br>

**其他语言:[英文](README.md)**

### 关于Unprettier
前言：代码美化工具用多了，这次整个代码丑化工具

本项目参考了这个项目：([Shittier](https://github.com/rohitdhas/shittier)).

本项目为代码格式化工具，可以生成不易阅读、难以理解并且毫无逻辑的糟糕代码。

> [!NOTE]
> 当前仅对js文件有全面的支持，详情见[注意事项](#notes)

你可以在格式化后的代码中领略到
- 基于作用域的,大小写随机的标识符
- 随意的缩进
- 针对数字的任意进制表示
- 很多无厘头的评论（采用不同注释格式）

有一说一，可以把转换的代码发给想抄作业的同学（bushi

### 效果
![Before and After](./public/effect.png)

### 注意事项
当前只支持js文件，后期会逐步更新对其他语言的支持（大概）
- 当前对于TypeScript也有全面的支持，但是是实验性的，还需要一定的测试
- 对于其他类型的文件暂时智能应用随机的缩进

### 安装
1. 首先确保当前环境支持Node.js
2. 在控制台中输入如下命令
   ```shell
   npm install unprettier
   ```
   如果确实需要全局安装，请使用如下代码
   ```shell
   npm install -g unprettier
   ```

### 使用
安装成功后，可以运行如下代码进行格式化
```
unprettier <options> [input] [output]
```

### 选项
- `-h, --help`: 展示帮助面板
- `-f, --force`: 覆盖输出文件（即使对应文件有其他内容）

### 示例
- 格式化当前目录下名为temp.js的文件
  ```
  unprettier temp.js changed_temp.js
  ```

### 未来展望
- 支持更多语言
- 支持文件夹为单位的批量文件处理

### 免责声明
Unpretier是一个纯粹的娱乐项目，强烈不建议在开发环境中使用。在产品项目中使用Unprettier大概率会导致代码编写和阅读的体验下降以及代码执行效率的下降。