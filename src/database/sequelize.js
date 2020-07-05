const Sequelize = require('sequelize');

const conf = {
  host: 'localhost',
  dialect: 'mysql',
};

const seq = new Sequelize('learn-weibo', 'root', 'root123456', conf);

module.exports = seq;  
