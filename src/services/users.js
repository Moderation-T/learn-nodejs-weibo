/**
 * @description 用户管理 service 层，处理数据并返回格式化数据
 * @author 一只鱼
 */

const { User } = require('../database/model/index');
const { formatUserInfo } = require('../services/_format');

async function getUserInfo(userName, password) {
  let whereOpt = { userName: userName };

  if (password) {
    Object.assign(whereOpt, { password });
  }

  const userInfo = await User.findOne({
    where: whereOpt,
  });

  // 如果不存在 就返回 null
  if (userInfo == null) {
    return userInfo;
  }

  // 格式化数据之后在返回

  return formatUserInfo(userInfo.dataValues);
}

module.exports = {
  getUserInfo,
};
