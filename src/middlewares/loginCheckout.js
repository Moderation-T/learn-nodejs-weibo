/**
 * @description 登陆 api 与 页面路由 检测
 * @author 一只鱼
 */

const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');

/**
 * api 登陆验证
 * @param {Object} ctx koa ctx
 * @param {Function} next  koa ctx
 */

async function loginCheckout(ctx, next) {
  // 如果已登陆
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  }

  // 未登陆返回错误信息
  ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 * 页面 登陆验证
 * @param {Object} ctx koa ctx
 * @param {Function} next  koa ctx
 */

async function loginViewCheckout(ctx, next) {
  // 如果已登陆
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  }

  // 如果未登陆 跳转登陆也
  const curUrl = ctx.url;
  ctx.redirect(`/login?url${encodeURIComponent(curUrl)}`);
}

module.exports = {
  loginCheckout,
  loginViewCheckout,
};
