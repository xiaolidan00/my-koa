const fs = require("fs");
const path = require("path");
const compose = require("koa-compose");
const routerDir = "./routers";
const registerRouter = () => {
  return new Promise((resolve) => {
    let routers = [];
    //递归获取routers文件夹下所有js文件
    fs.readdir("./routers", (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(data);
      data.forEach((router) => {
        console.log(router);
        const r = require(routerDir + "/" + router);
        routers.push(r.routes());
        routers.push(r.allowedMethods());
      });
      resolve(compose(routers));
    });
  });
};
module.exports = registerRouter;
