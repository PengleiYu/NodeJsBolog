const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { get, set } = require('../db/redis')

const handleUserRouter = async (req) => {
    const method = req.method
    if (method === 'POST') {
        // user登录
        if (req.path === '/api/user/login') {
            const { username, password } = req.body;
            const result = await login(username, password)
            if (result.username) {
                req.session.username = result.username
                req.session.realname = result.realname
                set(req.sessionId, req.session)
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        }
    }
}
module.exports = handleUserRouter