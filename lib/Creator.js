const path = require("path");
const { fetchRepoList, fetchTagList } = require("./request");
const { wrapLoading } = require("./utils");
const Inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo");

const util = require("util");

class Creator {
  constructor(projectName, targetDir) {
    this.projectName = projectName;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo); // 转化成promise
  }
  async create() {
    // 2、要实现脚手架，需要先实现一个交互的功能 inquirer
    // 3、将模板下载下来 download-git-repo
    // 4、根据用户选择动态生成内容 metalsmith
    // console.log(this.projectName, this.targetDir);
    // 先去拉取当前组织下的模板
    let repo = await this.fetchRepo();
    // 再通过模板找到版本号
    let tag = await this.fetchTag(repo);
    // 下载
    let downUrl = await this.download(repo, tag);
    // 编译模板。。。
  }
  // https://api.github.com/orgs/zhu-cli/repos
  async fetchRepo() {
    // 失败了重新获取
    let repos = await wrapLoading(fetchRepoList, "wait fetch template");
    if (!repos) {
      return;
    }
    repos = repos.map((item) => item.name);
    console.log(repos);
    // 选择仓库名
    let { repo } = await Inquirer.prompt([
      {
        name: "repo",
        type: "list", // 类型非常丰富
        message: `please choose a template to create project`,
        choices: repos,
      },
    ]);
    console.log(repo);
    return repo;
  }
  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, "wait fetch tag", repo);
    if (!tags) {
      return;
    }
    tags = tags.map((item) => item.name);
    console.log(tags);
    // 选择tag名称
    let { tag } = await Inquirer.prompt([
      {
        name: "tag",
        type: "list", // 类型非常丰富
        message: `please choose a tag to create project`,
        choices: tags,
      },
    ]);
    console.log(tag);
    return tag;
  }
  async download(repo, tag) {
    // downloadGitRepo
    // 拼接出下载路径
    let requestUrl = `zhu-cli/${repo}${tag ? "#" + tag : ""}`;
    // 把资源下载到某个路径上
    // 可以增加缓存功能
    // 应该下载到系统目录中
    // 稍后可以再使用ejs handlerbar 去渲染模板 最后生成结果再写入
    wa;
    await wrapLoading(
      this.downloadGitRepo,
      "wait download git repo",
      requestUrl,
      path.resolve(process.cwd(), `${repo}@${tag}`)
    );
    return this.targetDir;
  }
}

module.exports = Creator;
