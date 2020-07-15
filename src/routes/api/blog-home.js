/**
 * @description 博客首页 api 路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const { create } = require('../../controller/blog-home');
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { genValidator } = require('../../middlewares/validator');
const { blogValidator } = require('../../validator/blog');

router.prefix('/api/blog');

router.post('/create', loginCheckout, genValidator(blogValidator), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const userId = ctx.session.userInfo.id;

  ctx.body = await create({ userId, content, image });
});

module.exports = router;
