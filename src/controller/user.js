const { exec } = require('../db/mysql')
const login = async (username, password) => {
    const sql = `select username, realname from users where username= '${username}' and password = '${password}'`
    const row = await exec(sql)
    return row[0] || {}
}

module.exports = { login }