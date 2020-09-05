/**
 * @description 数据模型入口文件
 * @author 一只鱼
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

UserRelation.belongsTo(User, {
  foreignKey: 'follower_id',
});

User.hasMany(UserRelation, {
  foreignKey: 'user_id',
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'user_id',
  targetKey: 'follower_id'
})

module.exports = {
  User,
  Blog,
  UserRelation
};
