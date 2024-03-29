const fs = require('fs')
const path = require('path')
const readline = require('readline')

const filename = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(filename)
const rl = readline.createInterface({
    input: readStream
})
let chromeNum = 0
let sum = 0

rl.on('line', (input) => {
    if (!input) {
        return
    }
    sum++
    const arr = input.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++
    }
})
rl.on('close', () => {
    console.log('Chrome占比: ', chromeNum / sum)
})