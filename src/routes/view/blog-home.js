/**
 * @description 微博首页 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogHomeList } = require('../../controller/blog-home');
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.get('/index', async (ctx, next) => {
  // controller 获取微博列表
  const blogListData = await getBlogHomeList({ pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;
  console.log('blogList的结果', blogList);
  console.log('blogList user的结果', blogList.user);

  await ctx.render('index', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageSize,
      pageIndex,
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
