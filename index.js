#!/usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require('commander');
const process1 = require('child_process');
//version 版本号
//name 新项目名称
program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .description('初始化项目模版...')
    .action((name) => {
        console.log('clone template ...');
        process1.exec('git clone http://10.106.11.64/liushengzhi/my-dd-mini-program-cli-template.git ' + name, function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                return;
            }
            console.log(stdout);
            console.log('clone success');
        });
    });
// 解析命令行
program.parse(process.argv);
