const http = require("http");
const path = require("path");
const fs = require("fs");
const port = 5555;
const fileType = {
  png: "image/png",
  jpg: "image/jpg",
  html: "text/html",
  js: "application/javascript",
  css: "text/css",
  json: "application/json"
};

// response.setHeader("Access-Control-Allow-Origin", ((HttpServletRequest) req).getHeader("Origin"));
//         response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE,PUT");
//         response.setHeader("Access-Control-Max-Age", "3600");
//         response.setHeader("Access-Control-Allow-Headers", "Content-Disposition,Origin, X-Requested-With, Content-Type, Accept,Authorization,id_token");
//         response.setHeader("Access-Control-Allow-Credentials","true");
//         response.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'self'; object-src 'none'");
//         response.setHeader("X-Content-Type-Options", "nosniff");
//         response.setHeader("X-XSS-Protection", "1; mode=block");
const server = http
  .createServer((req, res) => {
    const url = req.url === "/" ? "/index.html" : req.url;
    const type = url.substring(url.lastIndexOf(".") + 1);
    const filePath = path.join(__dirname, url);
    console.log(url, type);
    fs.readFile(filePath, (err, data) => {
      if (err) res.end(err.message);
      else {
        //禁止iframe嵌套
        res.setHeader("X-Frame-Options", "SAMEORIGIN");
        // res.setHeader("Content-Security-Policy", `frame-ancestors 'self'`);
        //静态资源MIME类型
        try {
          if (fileType[type]) {
            res.setHeader("Content-Type", fileType[type]);
          }
        } catch (err) {}
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'self'; object-src 'none'"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE,PUT");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Disposition,Origin, X-Requested-With, Content-Type, Accept,Authorization,token,X-Frame-Options"
        );
        res.end(data);
      }
    });
  })
  .listen(port);

server.on("error", (err) => {
  console.log("🚀 ~ index.js ~ server.on ~ err:", err);
});

console.log(`Server running at http://127.0.0.1:${port}/`);
