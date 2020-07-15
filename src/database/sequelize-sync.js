/**
 * @description sequelize 同步 MySQL
 * @author 一只鱼
 */

const seq = require('./sequelize');
// 引入模型
require('./model/index');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('连接正常');
  })
  .catch(() => {
    console.log('连接异常');
  });

seq.sync({ force: true }).then(() => {
  console.log('同步完成 并清空原有数据防止干扰');
  process.exit();
});
