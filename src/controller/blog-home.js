/**
 * @description 博客首页 controller
 * @author 一只鱼
 */

const { getBlogList, createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');

/**
 * 创建博客
 *
 * @param {*} { userId, content, image }
 */
async function create({ userId, content, image }) {
  try {
    const newBlog = await createBlog({ userId, content, image });
    return new SuccessModel(newBlog);
  } catch (ex) {
    console.log(ex.message, ex.stack);
    new ErrorModel(createBlogFailInfo);
  }
}

/**
 * 获取首页博客列表
 *
 * @param {*} { userName, pageIndex, pageSize }
 */
async function getBlogHomeList({ userName, pageIndex, pageSize }) {
  const BlogList = await getBlogList({ userName, pageIndex, pageSize });
}

module.exports = {
  create,
  getBlogHomeList,
};
