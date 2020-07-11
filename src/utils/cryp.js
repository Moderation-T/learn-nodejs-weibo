/**
 * @description password 加密
 * @author 一只鱼
 */

const crypto = require('crypto');
const { CRYPTO_SECRET_KEY } = require('../conf/constants');

// md5 加密
function _md5(content) {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${CRYPTO_SECRET_KEY}`;
  return _md5(str);
}

module.exports = {
  genPassword,
};
