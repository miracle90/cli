const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");

module.exports = async function (projectName, options) {
  console.log(projectName, options);
  // 1、判断是否有重名项目
  const cwd = process.cwd(); // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    // 如果是强制执行
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      let { action } = await Inquirer.prompt([
        {
          name: "action",
          type: "list", // 类型非常丰富
          message: `Target directory already exists Pick an action:`,
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);
      console.log(action);
      if (action === "overwrite") {
        console.log(`\r\nRemoving`);
        await fs.remove(targetDir);
      }
    }
  }
  // 2、创建项目
  const creator = new Creator(projectName, targetDir);
  creator.create()
};
