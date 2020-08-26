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
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
} = require('../model/ErrorInfo');
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/users');
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
  try {
    const registerInfo = await createUser({ userName, password, gender });
    return new SuccessModel(registerInfo);
  } catch (ex) {
    console.log(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 用户登陆
 *
 * @param {Object} ctx koa ctx
 * @param {Object} { userName, password }
 * @returns
 */
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

/**
 * 删除当前登陆用户
 * 只在支持在测试环境使用
 *
 * @param {String} userName 用户名
 */
async function deleteCurrentUser(userName) {
  const deleteUserResult = await deleteUser(userName);
  if (deleteUserResult) {
    return new SuccessModel();
  } else {
    return new ErrorModel(deleteUserFailInfo);
  }
}

/**
 * 更新用户信息
 * @param {Object} ctx koa ctx
 * @param {Object} {userName,nickName,city,picture} {用户名，昵称，城市，图片地址}
 */
async function updateUserInfo(ctx, { userName, nickName, city, picture }) {
  const updateInfo = await updateUser({ userName, nickName, city, picture });
  if (updateInfo) {
    // 更新 session
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    });
    return new SuccessModel();
  } else {
    return new ErrorModel(changeInfoFailInfo);
  }
}

/**
 * 修改密码
 *
 * @param {*} ctx koa ctx
 * @param {*} { userName, password, newPassword } {用户名，旧密码，新密码}
 */
async function updatePassword(ctx, { userName, password, newPassword }) {
  const updateInfo = await updateUser({ userName, password, newPassword });
  if (updateInfo) {
    // 更新 session
    Object.assign(ctx.session.userInfo, {
      password,
    });
    return new SuccessModel();
  } else {
    return new ErrorModel(changePasswordFailInfo);
  }
}


/**
 * 退出登录
 *
 * @param {*} ctx koa ctx
 * @returns
 */
function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel();
}

async function getCurrentUser(userName) {
  const userInfo = await getUserInfo(userName);

  return new SuccessModel(userInfo);
}

module.exports = {
  isUserExist,
  register,
  login,
  deleteCurrentUser,
  updateUserInfo,
  updatePassword,
  logout,
  getCurrentUser
};
