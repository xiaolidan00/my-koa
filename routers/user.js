const Router = require("koa-router");
const router = new Router();
router.prefix("/user");
const { sign } = require("jsonwebtoken");
const secret = "Hello";
const jwt = require("koa-jwt")({ secret });

router.get("/getInfo", async (ctx) => {
  ctx.body = "I am xiaoming";
});
router.get("/info", jwt, async (ctx) => {
  ctx.body = {
    name: "BBBBB",
  };
});

router.post("/login", async (ctx, next) => {
  const { username } = ctx.request.body;
  if (username) {
    const token = sign({ username }, secret, { expiresIn: "1h" });
    ctx.body = {
      message: "ok",
      code: 1,
      token,
    };
  } else {
    ctx.body = {
      message: "error",
      code: -1,
    };
  }
});
module.exports = router;
