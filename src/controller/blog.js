const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'Title A',
            content: 'Content A',
            createTime: 1566230195249,
            author: 'zhangsan'
        }, {
            id: 2,
            title: 'Title B',
            content: 'Content B',
            createTime: 1566230250139,
            author: 'lisi'
        }
    ]
}
const getDetail = (id) => {
    return {
        id: 1,
        title: 'Title A',
        content: 'Content A',
        createTime: 1566230195249,
        author: 'zhangsan'
    }
}
const newBlog = (blogData = {}) => {
    console.log(blogData)
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