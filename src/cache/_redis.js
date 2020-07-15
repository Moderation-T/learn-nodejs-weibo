/**
 * @description 连接 redis 的方法 get set
 */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/database');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.host, REDIS_CONF.port);
redisClient.on('error', (err) => {
  console.log('redis error', err);
});

/**
 *redis set
 *
 * @param {String} key 键
 * @param {String} val 值
 * @param {Number} timeout 过期时间
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }

  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 *redis get
 *
 * @param {*} key 键
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }

      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });

  return promise;
}

module.exports = {
  set,
  get,
};
