const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取post参数
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = async (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    const url = req.url;
    // 解析path、query
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])

    const postData = await getPostData(req)
    req.body = postData
    // 处理blog路由
    const blogData = await handleBlogRouter(req, res)
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }

    // 处理user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }
    // 未命中路由，返回404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.end('404 not found\n')
}

module.exports = serverHandle