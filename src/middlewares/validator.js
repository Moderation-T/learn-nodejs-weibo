/**
 * @description validator 验证中间件
 * @author 一只鱼
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo');
const { ErrorModel } = require('../model/ResModel');

/**
 *生成 json schema 验证中间件函数
 *
 * @param {Function} validateFn 验证函数
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const error = validateFn(ctx.request.body);
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
    } else {
      await next();
    }
  }

  return validator;
}

module.exports = {
  genValidator,
};
