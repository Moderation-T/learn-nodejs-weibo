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
    console.log('进到校验里来着');

    const error = validateFn(ctx.request.body);

    console.log('验证错误', error);

    if (error) {
      console.log('有错误');

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
