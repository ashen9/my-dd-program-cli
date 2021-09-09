const program = require('commander');
const process1 = require('child_process');
//version 版本号
//name 新项目名称
program.version('1.0.0', '-v, --version')
    .command('init <name>')
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
program.parse(process.argv);
