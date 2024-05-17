const koa = require("koa");
const Router = require("koa-router");
const router = new Router();
const port = 3456;
const { getLocalIP } = require("./utils/ip");

const websocket = require("koa-websocket");

const app = websocket(new koa());
const timer = {};
const wsObj = {};
router.all("/koa/ws", (ctx) => {
  let { id } = ctx.query;
  id = 0;
  // console.log(id)
  wsObj[id] = ctx;

  ctx.websocket.send("ping ok");
  ctx.websocket.on("message", (msg) => {
    console.log(msg);
    const uid = JSON.parse(msg).uid;
    if (!wsObj[uid]) {
      ctx.websocket.send(uid + " login fail");
    } else {
      wsObj[uid].websocket.send("okk");
    }
  });
  timer[id] = setInterval(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        name: Math.floor(Math.random() * 9999),
        value: Math.floor(Math.random() * 9999),
        idx: i,
      });
    }
    ctx.websocket.send(JSON.stringify(data));
  }, 5000);
});
app.ws.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
  const ip = getLocalIP();
  console.log(`ws://${ip}:${port}/koa/ws`);
});
