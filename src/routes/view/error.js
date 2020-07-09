/**
 * @description 错误 与 404页面路由
 * @author 一只鱼
 */

const router = require('koa-router')();

router.get('/error', async (ctx, next) => {
  await ctx.render('error', {});
});

router.get('./404', async (ctx, next) => {
  await ctx.render('404', {});
});

module.exports = router;
