/**
 * @description 微博首页 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogHomeList } = require('../../controller/blog-home');

router.get('/index', async (ctx, next) => {
  const pageIndex = 0;
  const pageSize = 10;

  // controller 获取微博列表
  // const blogListData = await getBlogHomeList({ pageIndex, pageSize });

  await ctx.render('index', {
    blogData: {
      isEmpty: true,
      blogList: [],
      count: 0,
      pageSize: 0,
      pageIndex: 0,
    },
    userData: {
      userInfo: {},
      fansData: {
        count: 0,
        list: [],
      },
      followersData: {
        count: 0,
        list: [],
      },
      atCount: 0,
    },
  });
});

module.exports = router;
