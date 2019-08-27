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

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}
// session数据
const SESSION_DATA = {}

const serverHandle = async (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    const url = req.url;
    // 解析path、query
    req.path = url.split('?')[0]
    req.query = queryString.parse(url.split('?')[1])
    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split('; ').forEach(element => {
        if (!element || element === '') return
        const arr = element.split('=')
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    });

    // 解析session
    let userId = req.cookie.userId
    let needSetCookie = false
    if (!userId) {
        userId = `${Date.now()}_${Math.random()}`
    }
    if (!SESSION_DATA[userId]) {
        SESSION_DATA[userId] = {}
        needSetCookie = true
    }
    req.session = SESSION_DATA[userId]

    const postData = await getPostData(req)
    req.body = postData
    // 处理blog路由
    const blogData = await handleBlogRouter(req, res)
    if (blogData) {
        if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(blogData))
        return
    }

    // 处理user路由
    const userData = await handleUserRouter(req, res)
    if (userData) {
        if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
        return
    }
    // 未命中路由，返回404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.end('404 not found\n')
}

module.exports = serverHandle