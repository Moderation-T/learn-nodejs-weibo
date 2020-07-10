/**
 * @description 用户数据模型
 * @author 一只鱼
 */

const seq = require('../sequelize');

const { STRING, DECIMAL } = require('../types');

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false, // 是否为空
    unique: true, // 是否唯一
    comment: '用户名，唯一', // 注释
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别 1男 2女 3保密',
  },
  picture: {
    type: STRING,
    comment: '头像 储存的是图片地址',
  },
  city: {
    type: STRING,
    comment: '城市',
  },
});

module.exports = User;
