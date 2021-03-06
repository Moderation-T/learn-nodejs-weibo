/**
 * @description 用户管理 service 层，处理数据并返回格式化数据
 * @author 一只鱼
 */

const { User } = require('../database/model/index');
const { formatUserInfo } = require('../services/_format');
const { genPassword } = require('../utils/cryp');
const { addFollower } = require('./user-relation')

/**
 * 获取用户信息
 *
 * @param {String} userName 用户名
 * @param {String} password 密码
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
  // 创建用户
  const createUserInfo = await User.create({
    userName,
    password: genPassword(password),
    gender,
  });

  console.log('createUserInfo', createUserInfo);

  const userId = createUserInfo.dataValues.id

  // 创建用户的同时让用户自己关注自己 目的是方便首页渲染关注人微博的时候也展示自己的微博
  await addFollower(userId, userId)

  return createUserInfo;
}

/**
 *删除用户 
 *
 * @param {String} userName 用户名称
 * @returns
 */
async function deleteUser(userName) {
  // 返回被删除的个数
  const deleteUser = await User.destroy({
    where: { userName },
  });

  return deleteUser > 0;
}

/**
 * 更新用户信息
 *
 * @param {*} { userName, nickName, city, picture, password, newPassword }
 * @returns
 */
async function updateUser({ userName, nickName, city, picture, password, newPassword }) {
  const whereOption = { userName };
  const updateOption = {};
  if (nickName) {
    updateOption.nickName = nickName;
  }
  if (city) {
    updateOption.city = city;
  }
  if (picture) {
    updateOption.picture = picture;
  }

  if (newPassword) {
    updateOption.password = newPassword;
  }

  if (password) {
    whereOption.password = password;
  }

  const updateUser = await User.update(updateOption, {
    where: whereOption,
  });

  return updateUser[0] > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
};
