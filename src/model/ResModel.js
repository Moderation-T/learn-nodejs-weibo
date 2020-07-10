/**
 * @description 返回数据模型
 * @author 一只鱼
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;

    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}

/**
 *数据请求成功的数据模型
 *
 * @class SuccessModel
 * @extends {BaseModel}
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    });
  }
}

/**
 *数据请求失败的数据模型
 *
 * @class ErrorModel
 * @extends {BaseModel}
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message,
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
