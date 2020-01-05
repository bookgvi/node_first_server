const http = require('http');
const fs = require('fs');

const readStream = fs.createReadStream('http/front/index.html', 'utf-8')
const server = http.createServer((req, res) => {
  console.log(req.url)
  if (req.url === '/') {
    console.log('We\'re on root...')
    readStream.pipe(res)
  }
})
server.listen('8080', () => {
  console.log('Server started - port 8080!')
})
