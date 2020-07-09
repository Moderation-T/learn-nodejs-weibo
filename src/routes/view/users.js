/**
 * @description 登陆 与 注册路由
 * @author 一只鱼
 */

const router = require('koa-router')();

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {});
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', {});
});

module.exports = router;
