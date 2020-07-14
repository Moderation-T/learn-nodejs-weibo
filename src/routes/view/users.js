/**
 * @description 登陆 与 注册路由
 * @author 一只鱼
 */

const router = require('koa-router')();

/**
 * 检测用户是否已登录
 *
 * @param {*} ctx koa ct x
 * @returns 返回用户是否登陆信息
 */
function checkoutUserIsLogin(ctx) {
  let data = {
    isLogin: false, // 默认未登陆
  };

  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    data = {
      isLogin: true,
      userName: ctx.session.userInfo.userName,
    };
  }

  return data;
}

// 登录页
router.get('/login', async (ctx, next) => {
  const { isLogin, userName } = checkoutUserIsLogin(ctx);

  await ctx.render('login', {
    isLogin,
    userName,
  });
});

// 注册页
router.get('/register', async (ctx, next) => {
  await ctx.render('register', {});
});

// 设置页
router.get('/setting', async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo);
});

module.exports = router;
