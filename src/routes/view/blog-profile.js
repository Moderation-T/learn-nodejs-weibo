/**
 * @description 个人空间 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogProfileList } = require('../../controller/blog-profile');
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.get('/profile', async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  // controller 获取微博列表
  const blogListData = await getBlogProfileList({ userName, pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;
  const { userInfo } = ctx.session;

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageSize,
      pageIndex,
    },
    userData: {
      userInfo,
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
