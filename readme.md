## 项目介绍

这个项目是基于webpack的react项目的空框架，路由使用了react-router。    
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


## 生成的项目注意

1. 生成的项目打包目录是`output`, 可在webpack-config/webpack.base.config.js文件中修改
2. 生成的索引HTML文件是`main.html`，可在webpack-config/webpack.prod.config.js文件中修改
3. 本地开发的索引HTML文件`index.html`

