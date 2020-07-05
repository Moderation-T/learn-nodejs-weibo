const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/database');
const { isProd } = require('../utils/env');

const { database, user, password, host } = MYSQL_CONF;

const conf = {
  host,
  dialect: 'mysql',
};

if(isProd) {
  conf.pool = {
    max:5, // 连接池中最大连接数量
    min:0, // 最小连接数量
    idle：10000 // 如果一个连接池 10s 没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
