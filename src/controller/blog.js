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
module.exports = { getList, getDetail }