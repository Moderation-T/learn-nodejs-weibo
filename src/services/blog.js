/**
 * @description Blog services
 * @author 一只鱼
 */

const { Blog } = require('../database/model/Blog');
const { DEFAULT_PAGESIZE } = require('../conf/constants');
const User = require('../database/model/User');
const { formatUserInfo } = require('../services/_format');

/**
 * 获取微博列表 如果有 userName 就是个人主页列表；如果没有 userName 就是首页列表
 *
 * @param {*} { userName, pageIndex, pageSize = DEFAULT_PAGESIZE }
 * @returns
 */
async function getBlogList({ userName, pageIndex, pageSize = DEFAULT_PAGESIZE }) {
  let userWhereOptions = {};
  if (userName) {
    userWhereOption.userName = userName;
  }

  const list = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOptions,
      },
    ],
  });

  // list.count 总数
  // list.rows 查询结果

  let blogList = list.map((row) => row.dataValues);
  // 格式化 user
  blogList = blogList.map((row) => {
    const user = row.user.dataValues;
    row.user = formatUserInfo(user);
    return row;
  });

  return {
    count: list.count,
    blogList,
  };
}

module.exports = {
  getBlogList,
};
