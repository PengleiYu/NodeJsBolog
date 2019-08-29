const { getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录检查
const checkLogin = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

const handleBlogRouter = async (req, res) => {
    const method = req.method
    const id = req.query.id;
    if (method === 'GET') {
        // blog列表
        if (req.path === '/api/blog/list') {
            const author = req.query.author || ''
            const keyword = req.query.keyword || ''
            const listData = await getList(author, keyword)
            return new SuccessModel(listData)
        }
        // blog详情
        if (req.path === '/api/blog/detail') {
            const detail = await getDetail(id)
            return new SuccessModel(detail)
        }
    }

    // 进行登录拦截
    const checkLoginResult = await checkLogin(req)
    if (checkLoginResult) {
        return checkLoginResult
    }

    if (method === 'POST') {
        // blog新建
        if (req.path === '/api/blog/new') {
            req.body.author = req.session.username
            const data = await newBlog(req.body)
            return new SuccessModel(data)
        }
        // blog更新
        if (req.path === '/api/blog/update') {
            const result = await updateBlog(id, req.body)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        }
        // blog删除
        if (req.path === '/api/blog/del') {
            const result = await delBlog(id, req.session.username)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        }
    }
}
module.exports = handleBlogRouter