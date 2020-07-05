const { isProd } = require('../utils/env');

let REDIS_CONF = {
  port: 6379,
  host: 'localhost',
};

let MYSQL_CONF = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root123456',
  database: 'learn-weibo',
};

// 生产环境下的配置
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: 'localhost',
  };
  MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root123456',
    database: 'learn-weibo',
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
