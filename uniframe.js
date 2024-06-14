//后台转发，去除iframe嵌套限制
const http = require('http');

const port = 10101;
// 1.创建代理服务
http.createServer(onRequest).listen(port);

function onRequest(req, res) {
  const options = {
    hostname: '127.0.0.1',
    port: 8088,
    path: req.url,
    method: 'GET'
  };
  console.log(req.url);
  // 2.代发请求
  const proxy = http.request(options, (_res) => {
    // 3.修改响应头
    const fieldsToRemove = ['x-frame-options', 'content-security-policy'];
    Object.keys(_res.headers).forEach((field) => {
      if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
        res.setHeader(field, _res.headers[field]);
      }
    });
    _res.pipe(res, {
      end: true
    });
  });
  req.pipe(proxy, {
    end: true
  });
}
console.log(`server http://127.0.0.1:${port}`);
