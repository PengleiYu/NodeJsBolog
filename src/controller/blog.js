const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author = ${author} `
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

    return {
        id: 3
    }
}
const updateBlog = (id, blogData = {}) => {
    console.log('update blog ', id, blogData)
    return true;
}
const delBlog = (id) => {
    return true;
}
module.exports = { getList, getDetail, newBlog, updateBlog, delBlog }