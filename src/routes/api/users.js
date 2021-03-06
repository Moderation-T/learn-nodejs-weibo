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
  logout,
} = require('../../controller/users');
const { genValidator } = require('../../middlewares/validator');
const { userValidator } = require('../../validator/user');
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { getFollowerList } = require('../../controller/user-relation')
const { isTest } = require('../../utils/env');
const { genPassword } = require('../../utils/cryp');
const { SuccessModel } = require('../../model/ResModel');

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
router.patch('/changeInfo', loginCheckout, genValidator(userValidator), async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  const { nickName, city, picture } = ctx.request.body;

  ctx.body = await updateUserInfo(ctx, { userName, nickName, city, picture });
});

// 修改密码 [bug: 因为忘记return new SuccessModel() 所以总是 undefined了]
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
router.post('/logout', loginCheckout, async (ctx, next) => {
  ctx.body = await logout(ctx);
});

// 获取关注人列表
router.get('/getAtList', loginCheckout, async (ctx, next) => {

  const { id: userId } = ctx.session.userInfo

  // controller
  // controller 获取关注人列表 user_id === userId 我关注的
  const followerListData = await getFollowerList({ userId })
  const { followerList } = followerListData.data
  ctx.body = followerList.map(item => item.userName)
})

module.exports = router;
