const http = require('http')
const queryString = require('querystring')

const server = http.createServer(function (req, res) {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);
    const resData = { method, url, path, query }

    if (method === 'GET') {
        res.end(JSON.stringify(resData));
    } else if (method === 'POST') {
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            resData.postData = postData;
            res.end(JSON.stringify(resData))
        })
    }
})
server.listen(3000, () => {
    console.log('listen port 3000')
})