/**
 * @description 用户关系-粉丝/关注 controller
 * @author 一只鱼
 */

const { getUsersByFollowerId, addFollower, removeFollower } = require('../services/user-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * 获取粉丝列表
 *
 * @param {*} { userId }
 * @param {integer} userId 当前用户 id
 */
async function getFanList({ userId }) {
  const list = await getUsersByFollowerId({ userId });

  if (list) {
    const { count, fanList } = list;
    return new SuccessModel(list);
  } else {
    return new ErrorModel();
  }
}

// 关注
async function follow(myUserId, currentUserId) {
  // service
  try {
    const result = await addFollower(myUserId, currentUserId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

// 取消关注
async function unFollow(myUserId, currentUserId) {
  // service
  try {
    const result = await removeFollower(myUserId, currentUserId)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(deleteFollowerFailInfo)
  }
}

module.exports = {
  getFanList, follow, unFollow
};
