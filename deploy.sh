#!/usr/bin/env sh
# 部署到github Pages脚本，终端使用 bash deploy.sh ,不需要可以删除这个文件

echo '开始执行命令'
# 生成静态文件
echo '执行命令：打包文件'
# npm run build
webpack --config ./webpack-config/webpack.prod.config.js

# 进入生成的文件夹
echo "执行命令：cd ./output\n"
cd ./output

# 初始化一个仓库，仅仅是做了一个初始化的操作，项目里的文件还没有被跟踪
echo "执行命令：git init\n"
git init

# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'


# 如果发布到 https://<USERNAME>.github.io/<REPO>
echo "执行命令：git push -f https://github.com/yulilong/react-templet master:gh-pages'"
git push -f https://github.com/yulilong/react-templet master:gh-pages

# 返回到上一次的工作目录
echo "回到刚才工作目录"
cd -

# echo "打开码云 Gitee Pages 服务，手动更新服务"
# open https://gitee.com/dragon-li/react-templet/pages