/**
 * @description 数据模型入口文件
 * @author 一只鱼
 */

const User = require('./User');
const Blog = require('./Blog');

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = {
  User,
  Blog,
};
