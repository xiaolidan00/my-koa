# my-koa

```bash
# 初始化pm2配置文件
pm2 init simple
# 使用配置文件启动
pm2 start ecosystem.config.js
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
配置redis.windows.conf密码
```
requirepass 123456
```