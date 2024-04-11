const Router = require("koa-router");
const router = new Router();
const redis = require("../db/redis");
router.prefix("/goods");

router.get("/getInfo", async (ctx) => {
  ctx.body = "Hello world";
});
router.get("/setredis", async (ctx) => {
  try {
    let result = await redis.setItem("hello", Math.round(Math.random() * 999));
    ctx.body = "set redis  " + result;
  } catch (error) {
    ctx.body = "fail to set redis";
  }
});
router.get("/getredis", async (ctx) => {
  try {
    let data = await redis.getItem("hello");
    ctx.body = "redis data" + data;
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
