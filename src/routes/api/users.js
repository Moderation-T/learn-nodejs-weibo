/**
 * @description 用户相关路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const { isUserExist, register, login, deleteCurrentUser } = require('../../controller/users');
const { genValidator } = require('../../middlewares/validator');
const { userValidator } = require('../../validator/user');
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { isTest } = require('../../utils/env');

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

// 删除用户
router.post('/delete', loginCheckout, async (ctx, next) => {
  // 只有在测试环境支持删除操作
  if (isTest) {
    const { userName } = ctx.session.userInfo; // 只支持删除当前的用户
    ctx.body = await deleteCurrentUser(userName);
  }
});

module.exports = router;
