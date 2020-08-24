/**
 * @description 用户关系-粉丝/关注 controller
 * @author 一只鱼
 */

const { getUsersByFollowerId } = require('../services/user-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { addFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * 获取粉丝列表
 *
 * @param {*} { userId }
 * @param {integer} userId 当前用户 id
 */
async function getFanList({ userId }) {
  const list = await getUsersByFollowerId({ userId });

  return userId

  // if (list) {
  //   const { count, fanList } = list;
  //   return new SuccessModel({
  //     fanList,
  //     count,
  //   });
  // } else {
  //   return new ErrorModel(addFollowerFailInfo);
  // }
}

module.exports = {
  getFanList,
};
