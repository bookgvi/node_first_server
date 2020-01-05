const http = require('http');
const fs = require('fs');

const baseURL = 'http/front/';

const readStream = fs.createReadStream(`${baseURL}index.html`, 'utf-8')
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    readStream.pipe(res)
  } else if (req.url === '/about') {
    fs.readFile(`${baseURL}about.html`, 'utf-8',(err, data) => {
      if (err) {
        res.statusCode = 404
        res.statusMessage = 'Resource not found'
        res.setHeader("Content-type", "text/html; charset=utf-8;")
        res.write("<h2 style='margin-top: 5rem; text-align: center'>404 - Not found</h2>")
        res.end()
      } else {
        const message = 'This is about page'
        data = data.replace('{{ message }}', message)
        res.end(data)
      }
    })
  }
})
server.listen('8080', () => {
  console.log('Server started - port 8080!')
})
