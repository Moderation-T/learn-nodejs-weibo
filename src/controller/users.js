/**
 * @description 用户管理 controller 层，定义业务逻辑与数据返回格式
 * @author 一只鱼
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  registerUserNameExistInfo,
  loginFailInfo,
} = require('../model/ErrorInfo');
const { getUserInfo, createUser } = require('../services/users');
const { genPassword } = require('../utils/cryp');

/**
 *判断用户是否存在
 *
 * @param {String} userName 用户名
 */
async function isUserExist(userName) {
  const userInfo = await getUserInfo(userName);

  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 *用户注册
 *
 * @param {Object} { userName, password, gender } 用户的注册信息
 * @param {String} userName
 * @param {String} password
 * @param {Number} gender 1-男 2-女 3-保密
 * @returns
 */
async function register({ userName, password, gender }) {
  // 先做个判断看用户是否存在
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }

  // 不存在进行注册
  const registerInfo = await createUser({ userName, password, gender });

  if (registerInfo) {
    return new SuccessModel(registerInfo);
  } else {
    return new ErrorModel(registerFailInfo);
  }
}

async function login(ctx, { userName, password }) {
  // 查看是否有这个用户
  const userInfo = await getUserInfo(userName, genPassword(password));

  // 没有此用户则登陆失败
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }

  // 如果有则登陆成功
  if (ctx.session.userInfo == null) {
    // 设置 session
    ctx.session.userInfo = userInfo;
  }

  return new SuccessModel();
}

module.exports = {
  isUserExist,
  register,
  login,
};
