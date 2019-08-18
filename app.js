const http = require('http')
const queryString = require('querystring')

const server = http.createServer(function (req, res) {
    const url = req.url;
    console.log('url=', url);
    if (req.method === 'GET') {
        req.query = queryString.parse(url.split('?')[1]);
        res.end(JSON.stringify(req.query));
    } else if (req.method === 'POST') {
        console.log('content-type', req.headers['content-type'])
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        });
        req.on('end', () => {
            console.log(postData)
            res.end('Hello world')
            console.log('')
        })
    }
})
server.listen(3000, () => {
    console.log('listen port 3000')
})