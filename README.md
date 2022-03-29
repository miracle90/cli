#### commander 进行命令行命令、参数获取

#### inquirer 选项

#### download-git-repo 仓库获取，公司自建的需要gitlab的api，使用 download 这个库进行下载

#### 将包变成全局的 npm link

1. 创建可执行的脚本 bin/yy
1. 配置 package.json 中的 bin 字段 ./bin/yy
1. npm link 链接到本地环境（默认取package.json中的name）

link相当于将当前本地模块连接到npm目录下，这个npm目录可以直接访问，所以当前包就可以访问了

#### 集成了哪些功能

* 公司的sso
* 水印
* 自己团队的ui组件库
* 管理系统固有的布局
* 发布流程 nginx
* 接口封装
* 相关lint