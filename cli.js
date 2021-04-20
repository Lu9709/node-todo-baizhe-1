#!/usr/bin/env node
// 添加shebang
const program = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')

program
  .version(pkg.version)
program
  .command('add')
  .description('add a task')
  .action(() => {
    const words = process.argv.slice(3).join(' ')
    api.add(words).then(() => {
      if (words === '') {
        console.log('未添加内容')
      } else {
        console.log('添加成功')
      }
    }, () => {
      console.log('添加失败')
    })

  });
program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => {
      console.log('清除成功')
    }, () => {
      console.log('清除失败')
    })
  });
program
  .command('showAll')
  .description('showAll tasks')
  .action(() => {
    api.showAll().then()
  });

if (process.argv.slice(2).length === 0) {
  void api.showAll()
}
program.parse(process.argv);

