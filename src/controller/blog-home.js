/**
 * @description 博客首页 controller
 * @author 一只鱼
 */

const { getBlogList } = require('../services/blog');

async function getBlogHomeList({ userName, pageIndex, pageSize }) {
  const BlogList = await getBlogList({ userName, pageIndex, pageSize });
}

module.exports = {
  getBlogHomeList,
};
