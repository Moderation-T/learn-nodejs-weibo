/**
 * @description 登陆注册路由
 * @author 一只鱼
 */

const router = require('koa-router')();

router.prefix('/api/user');

// 注册路由
router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.body = {};
});

// 用户是否存在
router.post('isExist', async () => {
  const { username, password } = ctx.request.body;
  ctx.body = {};
});

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  ctx.body = {};
});

module.exports = router;
