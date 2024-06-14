const Redis = require('ioredis');

const redis = new Redis('redis://:123456@127.0.0.1:6379/8');

module.exports = {
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      redis
        .set(key, value)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      redis.get(key, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log('redis result', result);
          resolve(result);
        }
      });
    });
  }
};
