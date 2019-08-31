const fs = require('fs')
const path = require('path')

function writeLog(wirteStream, log) {
    wirteStream.write(log + '\n')
}
function createWriteStream(fileName) {
    const fullName = path.resolve(__dirname, '../', '../', 'logs', fileName)
    const wirteStream = fs.createWriteStream(fullName, {
        flags: 'a'
    })
    return wirteStream
}

const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = { access }
