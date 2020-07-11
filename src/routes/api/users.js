/**
 * @description 登陆注册路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const { isUserExist, register, login } = require('../../controller/users');
const { genValidator } = require('../../middlewares/validator');
const { userValidator } = require('../../validator/user');
const loginCheckout = require('../../middlewares/loginCheckout');

router.prefix('/api/user');

// 注册路由
router.post('/register', genValidator(userValidator), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  const result = await register({ userName, password, gender });
  ctx.body = result;
});

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // controller 判断用户是否存在
  const result = await isUserExist(userName);

  ctx.body = result;
});

// 登陆
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  const result = await login(ctx, { userName, password });
  ctx.body = result;
});

module.exports = router;
