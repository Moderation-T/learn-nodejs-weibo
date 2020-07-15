/**
 * @description  sequelize 模型
 * @author 一只鱼
 */

const seq = require('../sequelize');
const { STRING, TEXT, INTEGER } = require('../types');

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '关联 user 的外键',
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容',
  },
  image: {
    type: STRING,
    comment: '图片地址',
  },
});

module.exports = Blog;
