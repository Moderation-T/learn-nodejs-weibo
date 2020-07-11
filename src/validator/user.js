/**
 * @description 用户数据校验
 * @author 一只鱼
 */

const validator = require('./_validator');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
  },
};

function userValidator(data = {}) {
  console.log('进入user校验里 data 是', data);

  return validator(SCHEMA, data);
}

module.exports = { userValidator };
