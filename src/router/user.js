const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        // user登录
        if (req.path === '/api/user/login') {
            // return { msg: '这是登录的接口' }
            const { username, password } = req.body;
            const result = await loginCheck(username, password)
            if (result.username) {
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        }
    }
}
module.exports = handleUserRouter