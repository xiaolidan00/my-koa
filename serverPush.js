const http = require('http');
const port = 8088;
let interval;
http
  .createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/stream') {
      if (interval) clearInterval(interval);
      res.writeHead(200, {
        //event-stream 服务端推送
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write('retry: 10000\n');
      res.write('event: connecttime\n');
      let count = 0;

      interval = setInterval(function () {
        console.log('data', count);
        res.write('data: ' + count + '\n\n');
        count++;
      }, 1000);

      req.connection.addListener(
        'close',
        function () {
          console.log('close');
          clearInterval(interval);
        },
        false
      );
    }
  })
  .listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);
