const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = async (req, res) => {
    const method = req.method
    if (method === 'GET') {
        // user登录
        if (req.path === '/api/user/login') {
            // return { msg: '这是登录的接口' }
            const { username, password } = req.query;
            const result = await login(username, password)
            if (result.username) {
                res.setHeader('Set-Cookie', `username=${result.username}; path=/`)
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        }
    }
    if (req.path === '/api/user/testLogin') {
        console.log(req.cookie)
        console.log(req.cookie.username)
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel(req.cookie.username))
        } else return Promise.resolve(new ErrorModel('尚未登录'))
    }
}
module.exports = handleUserRouter