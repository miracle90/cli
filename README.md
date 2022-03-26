### 将包变成全局的

1. 创建可执行的脚本 bin/yy
1. 配置 package.json 中的 bin 字段 ./bin/yy
1. npm link 链接到本地环境（默认取package.json中的name）

link相当于将当前本地模块连接到npm目录下，这个npm目录可以直接访问，所以当前包就可以访问了