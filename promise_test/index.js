const path = require('path')
const fs = require('fs')

function getFileContent(fileName) {
    var promise = new Promise((resolve, reject) => {
        const fullName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullName, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(data.toString()))
            }
        })
    })
    return promise;
}
// 使用promise，跟dart的future非常类似
getFileContent('a.json').then((v) => {
    console.log(v)
    return getFileContent(v.next)
}).then((v) => {
    console.log(v)
    return getFileContent(v.next)
}).then((v) => {
    console.log(v)
})

// await async方式，promise的语法糖
async function asyncLoad(file) {
    var va = await getFileContent(file)
    console.log(va)
    var vb = await getFileContent(va.next)
    console.log(vb)
    var vc = await getFileContent(vb.next)
    console.log(vc)
}
asyncLoad('a.json')