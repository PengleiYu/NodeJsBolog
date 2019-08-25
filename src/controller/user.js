const { exec } = require('../db/mysql')
const loginCheck = async (username, password) => {
    const sql = `select username, realname from users where username= '${username}' and password = '${password}'`
    const row = await exec(sql)
    return row[0] || {}
}

module.exports = { loginCheck }