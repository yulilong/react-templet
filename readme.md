[TOC]

## 项目介绍

这个项目是基于webpack构建的react项目的空框架，路由使用了react-router。     

webpack版本：3.10.0，react版本：16.4.1，react-router版本:：3.2.0

注意：`"webpack-dev-server": "~2.11.0",`不能升级，如果升级到3.1.11版本，则会导致项目启动失败，应为这个版本需要webpack4.0以上版本。

本人使用这个项目做了好几个实际网站，效果还不错。

文件的样式是用LESS，如果想用SCSS，那么在webpack配置文件打开对应功能。

注：     
src/assets/images/.gitkeep，src/components/.gitkeep是为了git能提交空目录而创建的无用文件，可以删除。

## 目录结构

```
.
├── mock                        本地模拟数据文件
├── package.json                npm包管理文件
├── readme.md                   项目介绍
├── src                         项目源码文件
│   ├── assets                  资源文件
│   │   └── images              图片
│   ├── components              公共组件文件
│   │   └── base
│   ├── model                   redux代码存放
│   ├── favicon.ico             网站ico
│   ├── index.html              HTML入口文件
│   ├── index.jsx               js入口文件
│   ├── style                   公共样式文件
│   │   └── common.less
│   └── views                   所有的jsx文件
│       ├── app.less
│       ├── appRoutes.jsx
│       └── home
│           └── Home.jsx
└── webpack-config              webpack配置文件
    ├── webpack.base.config.js
    ├── webpack.dev.config.js
    └── webpack.prod.config.js
```

## 运行打包

1. 本地开发：
  ```
  npm install
  npm start
  ```
  
2. 项目打包：`npm run build`

   生成的项目打包目录是`output`, 可在webpack-config/webpack.base.config.js文件中修改


## 生成的项目注意

2. 打包后，生成的索引HTML文件是`index.html`，如果需要特别的名字，那么需要删除webpack.base.config.js文件中的ExtractTextPlugin插件，在webpack.dev.config.js中使用ExtractTextPlugin插件指定本地开发的入口文件名(index.html)，在webpack.prod.config.js中使用ExtractTextPlugin插件指定名字入口文件名(main.html)
3. 本地开发的索引HTML文件`index.html`

