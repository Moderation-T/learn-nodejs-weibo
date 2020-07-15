/**
 * @description 个人主页 controller
 * @author 一只鱼
 */

const { getBlogList } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { getBlogListFailInfo } = require('../model/ErrorInfo');

/**
 * 获取个人主页博客列表
 *
 * @param {*} { userName, pageIndex, pageSize }
 */
async function getBlogProfileList({ userName, pageIndex, pageSize }) {
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
  getBlogProfileList,
};
