# my-koa

```bash
# 初始化pm2配置文件
pm2 init simple
# 使用配置文件启动
pm2 start ecosystem.config.js
# 列出进程
pm2 list
# 关闭进程
pm2 kill
```

# redis

```bash
# redis服务端启动
redis-server.exe redis.windows.conf

# 客户端连接
redis-cli.exe -h 127.0.0.1 -p 6379
# 选择数据库，默认16个，选择第8个
select 8
# 设置值
set hello 1234
# 获取值
get hello
```

配置 redis.windows.conf 密码

```
requirepass 123456
```

# nginx

```bash
# 启动
start nginx
# 关闭
nginx -s stop

tasklist |findstr nginx.exe

taskkill /f /t /pid 17444
```

配置代理地址

```yaml
location /api/{
			proxy_pass http://localhost:4000/;
            #代理ip地址
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}
```

# websocket

```bash
node ws.js
```
