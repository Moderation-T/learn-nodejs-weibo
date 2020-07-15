/**
 * @description 用户数据校验
 * @author 一只鱼
 */

const validator = require('./_validator');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255,
    },
  },
};

function blogValidator(data = {}) {
  return validator(SCHEMA, data);
}

module.exports = { blogValidator };
