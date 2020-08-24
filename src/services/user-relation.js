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

  // let userList = list.rows.map((row) => row.dataValues);

  // 格式化 user
  // blogList = blogList.map((row) => {
  //   const user = row.user.dataValues;
  //   row.user = formatUserInfo(user);
  //   return row;
  // });

  return {
    count: 0,
    fanList: []
  };


}

module.exports = {
  getUsersByFollowerId
}