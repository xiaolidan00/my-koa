const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 8088;
const fileType = {
  png: 'image/png',
  jpg: 'image/jpg',
  html: 'text/html;charset=utf8',
  js: 'application/javascript;charset=utf8',
  css: 'text/css;charset=utf8'
};
http
  .createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;
    const type = url.substring(url.lastIndexOf('.') + 1);
    const filePath = path.join(__dirname, 'static', url);
    console.log(url, type);
    fs.readFile(filePath, (err, data) => {
      if (err) res.end(err.message);
      else {
        //禁止iframe嵌套
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('Content-Security-Policy', `frame-ancestors 'self'`);
        //静态资源MIME类型
        res.setHeader('Content-Type', fileType[type]);
        res.end(data);
      }
    });
  })
  .listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);
