const koa = require("koa");
const port = process.env.PORT || 4000;
const app = new koa();
const static = require("koa-static-router");

const bodyParser = require("koa-bodyparser");
const { logger, log4js } = require("./utils/loger");
const path = require("path");
const registerRouter = require("./registerRouter");
app.use(async (ctx, next) => {
  logger.info(ctx.req.url);
  await next();
});
app.use(
  static({
    dir: "static", //静态资源目录对于相对入口文件index.js的路径
    router: "/static/", //路由命名  路由长度 =2
  })
);
app.use(bodyParser());
// app.use(
//   log4js.connectLogger(log4js.getLogger("access"), {
//     level: log4js.levels.INFO,
//   })
// );
// const userRouter = require("./routers/user");
// const goodsRouter = require("./routers/goods");
// const Router = require("koa-router");
// const router = new Router();

// router.get("/goods/getInfo", async (ctx) => {
//   ctx.body = "Hello world";
// });
// router.get("/user/getInfo", async (ctx) => {
//   ctx.body = "I am xiaoming";
// });
// app.use(goodsRouter.routes());

async function main() {
  const routers = await registerRouter();
  app.use(routers);
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}
main();
