const homedir = require('os').homedir()
const home = process.env.HOME || homedir
//home 为home变量（用户设置优先使用）或系统home目录
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')//将路径拼接
const db ={
  read(path =dbPath){
    return new Promise((resolve,reject)=>{
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        //flag a+ 用于读取或追加，若没有就创建
        if (error) {return reject(error)}
        let list
        try {
          list = JSON.parse(data.toString())
        //  将list变为对象
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list,path=dbPath){
    return new Promise((resolve,reject)=>{
      const string = JSON.stringify(list)
      fs.writeFile(path,string+'\n',(error)=>{
        if(error) return reject(error)
        else resolve()
      })
    })

  }
}
module.exports =db

