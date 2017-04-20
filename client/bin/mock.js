#!/usr/bin/env node

/**
 * Dependencies
 */
const fs = require('fs');
const path = require('path');
const program = require('commander');
const FS = require('../lib/fs');
const HTTP = require('../lib/http');

const pkg = require('../package.json');

// 执行命令根路径
const execPath = process.cwd();

program
  .version(pkg.version)
  .option('-f, --file', '指定文件')
  .option('-d, --dir', '指定文件夹');

program
    .option('-f', '指定上传文件')
    .action(function(filePath, option) {
        let absPath = path.join(execPath, filePath);
        FS.readFile(absPath).then((res, err) => {
            const data = res;
            const options = {
                hostname: '127.0.0.1',
                port: 9090,
                path: '/upload',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'filePath': filePath
                }
            };
            HTTP.post(data, options).then((res, err) => {
                console.log(res);
                res = JSON.parse(res);
                if (res.success) {
                    var spawn = require('child_process').spawn;
                    spawn('open', ['http://127.0.0.1:9090' + res.data.filePath]);
                }
            });
        });
    });


program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ mock -f ./test.json');
  console.log('    $ mock -d ./');
  console.log('');
});

program.parse(process.argv);