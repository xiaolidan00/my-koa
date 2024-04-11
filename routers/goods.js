const Router = require("koa-router");
const router = new Router();
router.prefix("/goods");

router.get("/getInfo", async (ctx) => {
  ctx.body = "Hello world";
});
module.exports = router;
