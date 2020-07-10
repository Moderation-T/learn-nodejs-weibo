/**
 * @description 用户管理 service 层，处理数据并返回格式化数据
 * @author 一只鱼
 */

const { User } = require('../database/model/index');
const { formatUserInfo } = require('../services/_format');
const { genPassword } = require('../utils/cryp');

/**
 * 获取用户信息
 *
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @returns 返回用户信息
 */
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

/**
 * 用户注册
 *
 * @param {Object} { userName, password, gender } 用户信息
 * @param {String} userName
 * @param {String} password
 * @param {Number} gender 1-男 2-女 3-保密
 * @returns 返回创建的用户信息
 */
async function createUser({ userName, password, gender }) {
  const createUserInfo = User.create({
    userName,
    password: genPassword(password),
    gender,
  });

  return createUserInfo;
}

module.exports = {
  getUserInfo,
  createUser,
};
