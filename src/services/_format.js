/**
 * @description 格式化用户信息
 * @author 一只鱼
 */

const { DEFAULT_PICTURE } = require('../conf/constants');

/**
 *处理用户图片信息 若为空时返回默认头像图片
 *
 * @param {Object} userInfo 用户信息
 * @returns {Object} userInfo 返回处理图片信息后的用户信息
 */
async function _formatUserPicture(userInfo) {
  if (userInfo.picture == null) {
    userInfo.picture = DEFAULT_PICTURE;
  }

  return userInfo;
}

/**
 * 处理程序不止一个 这里提供统一处理后进行返回
 *
 * @param {Object|Array} userInfoList
 * @returns {Object|Array} 返回处理后的用户信息
 */
function formatUserInfo(userInfoList) {
  if (userInfoList == null) {
    return userInfoList;
  }

  if (userInfoList instanceof Array) {
    return userInfoList.map(_formatUserPicture);
  }

  return _formatUserPicture(userInfoList);
}

module.exports = {
  formatUserInfo,
};
