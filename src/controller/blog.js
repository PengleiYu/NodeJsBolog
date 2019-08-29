const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author = '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc; `
    return exec(sql)
}
const getDetail = async (id) => {
    let sql = `select * from blogs where id = ${id}`
    const list = await exec(sql)
    return list[0]
}
const newBlog = async (blogData = {}) => {
    const title = blogData['title']
    const content = blogData['content']
    const author = blogData['author']
    const create_time = Date.now()
    let sql = `insert into blogs (title, content, createtime, author) 
    values('${title}', '${content}', '${create_time}', '${author}')`
    const insertData = await exec(sql)
    // console.log(insertData)
    return {
        id: insertData.insertId
    }
}
const updateBlog = async (id, blogData = {}) => {
    let sql = `update blogs set title='${blogData['title']}', content='${blogData['content']}' where id=${id}`
    const okPack = await exec(sql)
    console.log(okPack)
    if (okPack.affectedRows > 0) return true
    else return false
}
const delBlog = async (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}'`
    const okPack = await exec(sql)
    console.log(okPack)
    if (okPack.affectedRows > 0) return true
    else return false
}
module.exports = { getList, getDetail, newBlog, updateBlog, delBlog }