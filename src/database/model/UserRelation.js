/**
 * @description 用户数据模型
 * @author 一只鱼
 */

const seq = require('../sequelize');

const { INTEGER } = require('../types');

const UserRelation = seq.define('user_relation', {
  user_id: {
    type: INTEGER,
    allowNull: false, // 是否为空
    comment: '关注人 id', // 注释
  },
  follower_id: {
    type: INTEGER,
    allowNull: false, // 是否为空
    comment: '被关注人 id', // 注释
  },
});

module.exports = UserRelation;
