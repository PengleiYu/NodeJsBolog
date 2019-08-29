const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { get, set } = require('../db/redis')

const handleUserRouter = async (req) => {
    const method = req.method
    if (method === 'GET') {
        // user登录
        if (req.path === '/api/user/login') {
            // return { msg: '这是登录的接口' }
            const { username, password } = req.query;
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
    if (req.path === '/api/user/testLogin') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel(req.session))
        } else return Promise.resolve(new ErrorModel('尚未登录'))
    }
}
module.exports = handleUserRouter