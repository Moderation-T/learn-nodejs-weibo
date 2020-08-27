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

module.exports = {
  getUsersByFollowerId
}