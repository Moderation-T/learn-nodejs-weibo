/**
 * @description 博客首页 controller
 * @author 一只鱼
 */

const { getBlogList, createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo, getBlogListFailInfo } = require('../model/ErrorInfo');

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
  const list = await getBlogList({ userName, pageIndex, pageSize });

  if (list) {
    const { count, blogList } = list;
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      blogList,
      count,
      pageSize,
      pageIndex,
    });
  } else {
    return new ErrorModel(getBlogListFailInfo);
  }
}

module.exports = {
  create,
  getBlogHomeList,
};
