/**
 * @description 用户相关路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const {
  isUserExist,
  register,
  login,
  deleteCurrentUser,
  updateUserInfo,
  updatePassword,
} = require('../../controller/users');
const { genValidator } = require('../../middlewares/validator');
const { userValidator } = require('../../validator/user');
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { isTest } = require('../../utils/env');
const { genPassword } = require('../../utils/cryp');

router.prefix('/api/user');

// 注册路由
router.post('/register', genValidator(userValidator), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({ userName, password, gender });
});

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await isUserExist(userName);
});

// 登陆
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, { userName, password });
});

// 删除用户
router.post('/delete', loginCheckout, async (ctx, next) => {
  // 只有在测试环境支持删除操作
  if (isTest) {
    const { userName } = ctx.session.userInfo; // 只支持删除当前的用户
    ctx.body = await deleteCurrentUser(userName);
  }
});

// 修改用户信息
router.patch('/changeInfo', loginCheckout, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  const { nickName, city, picture } = ctx.request.body;

  ctx.body = await updateUserInfo(ctx, { userName, nickName, city, picture });
});

// 修改密码
router.patch('/changePassword', loginCheckout, async (ctx, next) => {
  const { password, newPassword } = ctx.request.body;
  const { userName } = ctx.session.userInfo;
  ctx.body = await updatePassword(ctx, {
    userName,
    password: genPassword(password),
    newPassword: genPassword(newPassword),
  });
});

// 退出登陆
router.post('/logout');

module.exports = router;
