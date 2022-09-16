const inquirer = require("inquirer");
const execa = require("execa");
const { getEntryName } = require("./utils/tool")


inquirer
  .prompt([
    {
      type: "list",
      name: "name",
      message: '请选择要编译的项目:',
      choices:[ "all", ...getEntryName()],
      default: ['Babel', 'Linter / Formatter'],
      validate: function (answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }
        return true;
      },
      filter(value) {
        if (value.includes('all')) {
          return getEntryName()
        }
        return value
      },
    }
    /* Pass your questions in here */
  ])
  .then((answers) => {
    const message = `当前选中Package: ${answers.name.join(',')}`
    console.log(answers.name)
    runParallel(answers.name)
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


  // 调用打包命令
async function runParallel(packages) {
  console.log(packages)
  // 当前所有入口文件
  const message = `开始启动: ${packages.join('-')}`
  await build(packages)
}

function build () {
  // const stringLists = buildLists.join(separator)
  execa("webpack", ["--config", "./config/webpack.pro.js"], {
    stdio: 'inherit',
    extendEnv: false
  })

}