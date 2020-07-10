/**
 * @description 用户管理 controller 层，定义业务逻辑与数据返回格式
 * @author 一只鱼
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');
const { getUserInfo } = require('../services/users');

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

module.exports = {
  isUserExist,
};
