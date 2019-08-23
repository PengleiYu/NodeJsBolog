const { getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
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
            const detail = getDetail(id)
            return new SuccessModel(detail)
            // return { msg: '这里是博客详情接口' }
        }
    }
    if (method === 'POST') {
        // blog新建
        if (req.path === '/api/blog/new') {
            const data = newBlog(req.body)
            return new SuccessModel(data)
            // return { msg: '这里是新建博客接口' }
        }
        // blog更新
        if (req.path === '/api/blog/update') {
            const result = updateBlog(id, req.body)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
            // return { msg: '这里是更新博客接口' }
        }
        // blog删除
        if (req.path === '/api/blog/del') {
            const result = delBlog(id, req.body)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
            // return { msg: '这里是删除博客接口' }
        }
    }
}
module.exports = handleBlogRouter