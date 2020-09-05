const User = require('../database/model/User');
const UserRelation = require('../database/model/UserRelation')


/**
 * 查询粉丝列表
 *
 * @param {String} userName 用户名称
 * @returns
 */
async function getUsersByFollowerId({ userId }) {
  const list = await User.findAndCountAll({
    include: [
      {
        model: UserRelation,
        where: {
          follower_id: userId
        },
      },
    ],
  })


  // list.count 总数
  // list.rows 查询结果

  let fanList = list.rows.map((row) => row.dataValues);
  const { count } = list



  return {
    count,
    fanList
  };


}

// 添加关注人
async function addFollower(myUserId, currentUserId) {
  const result = await UserRelation.create({
    user_id: myUserId, follower_id: currentUserId
  })
  console.log('addFollower', result);
  return result[0] > 0
}

// 删除关注人
async function removeFollower(myUserId, currentUserId) {
  const result = await UserRelation.destroy({
    where: {
      user_id: myUserId,
      follower_id: currentUserId
    }
  })
  return result[0] > 0
}

module.exports = {
  getUsersByFollowerId, addFollower, removeFollower
}