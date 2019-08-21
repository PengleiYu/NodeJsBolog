const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method
    if (method === 'GET') {
        // blog列表
        if (req.path === '/api/blog/list') {
            const author = req.query.author || ''
            const keyword = req.query.keyword || ''
            const listData = getList(author, keyword)
            return new SuccessModel(listData)
            // return { msg: '这里是博客列表接口' }
        }
        // blog详情
        if (req.path === '/api/blog/detail') {
            const id = req.query.id;
            const detail = getDetail(id)
            return new SuccessModel(detail)
            // return { msg: '这里是博客详情接口' }
        }
    }
    if (method === 'POST') {
        // blog新建
        if (req.path === '/api/blog/new')
            return { msg: '这里是新建博客接口' }
        // blog更新
        if (req.path === '/api/blog/update')
            return { msg: '这里是更新博客接口' }
        // blog删除
        if (req.path === '/api/blog/del')
            return { msg: '这里是删除博客接口' }
    }
}
module.exports = handleBlogRouter