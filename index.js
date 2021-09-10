#!/usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require('commander');
const process1 = require('child_process');
const inquirer = require('inquirer');
const fs = require('fs');
const symbols = require('log-symbols');
const chalk = require('chalk');
const ora = require("ora");
const handlebars = require("handlebars");
const path = require('path');
//version 版本号
//name 新项目名称
program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .description('初始化项目模版...')
    .action((name) => {
        console.log('clone template ...');
        if(fs.existsSync(name)) {
            console.log(symbols.error, chalk.red('项目已存在'))
            return
        }
        inquirer.prompt([
            {
                name: "description",
                message: "请输入项目描述"
            },
            {
                name: "author",
                message: "请输入作者名称"
            }
        ]).then(answers => {
            process1.exec('git clone http://10.106.11.64/liushengzhi/my-dd-mini-program-cli-template.git ' + name, function(error, stdout, stderr) {
                /*if (error !== null) {
                    console.log('exec error: ' + error);
                    return;
                }
                console.log(stdout);
                console.log('clone success');*/
                const spinner = ora("正在下载模版...")
                spinner.start();
                if (error !== null) {
                    spinner.fail()
                    console.log(symbols.error, chalk.red(`拉取远程仓库模版失败${error}`))
                }
                spinner.succeed()
                const meta = {
                    name,
                    description: answers.description,
                    author: answers.author
                }
                const fileName = `${name}/package.json`

                // 模板目录
                // const tmplDir = path.join(__dirname, 'templates') // __dirname:当前模块的目录名
                // 目标目录
                const destDir = process.cwd() // Node.js 进程的当前工作目录。
                // console.log(path.join(destDir, fileName), fs.existsSync(path.join(destDir, fileName)))
                if (fs.existsSync(path.join(destDir, fileName))) {
                    const content = fs.readFileSync(fileName).toString()
                    const result = handlebars.compile(content)(meta)
                    // console.log(symbols.success, chalk.green(content), chalk.green(result))
                    fs.writeFileSync(path.join(destDir, fileName), result)
                }
                console.log(symbols.success, chalk.green("项目初始化完成"))
            });

        })
    });
// 解析命令行
program.parse(process.argv);
