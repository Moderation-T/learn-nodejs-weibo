const User = require('../database/model/User');
const UserRelation = require('../database/model/UserRelation')
const Sequelize = require('sequelize')


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
          follower_id: userId,
          user_id: {
            [Sequelize.Op.ne]: userId
          }
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

// 获取关注人列表
async function getUsersByUserId({ userId }) {
  const list = await UserRelation.findAndCountAll({
    include: [
      {
        model: User,

      },
    ],
    where: {
      user_id: userId,
      follower_id: {
        [Sequelize.Op.ne]: userId
      }
    },
  })

  // list.count 总数
  // list.rows 查询结果

  let followerList = list.rows.map((row) => row.dataValues).map(item => item.user.dataValues);
  const { count } = list


  return {
    count,
    followerList
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
  getUsersByFollowerId, getUsersByUserId, addFollower, removeFollower
}