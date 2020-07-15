/**
 * @description 广场页 controller
 * @author 一只鱼
 */

const { getBlogList, createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo, getBlogListFailInfo } = require('../model/ErrorInfo');

/**
 * 广场页
 *
 * @param {*} { userName, pageIndex, pageSize }
 */
async function getBlogSquareList({ pageIndex, pageSize }) {
  const list = await getBlogList({ pageIndex, pageSize });

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
  getBlogSquareList,
};
