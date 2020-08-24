/**
 * @description 微博首页 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogHomeList } = require('../../controller/blog-home');
const { getFanList } = require('../../controller/user-relation')
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.get('/', async (ctx, next) => {
  // controller 获取微博列表
  const blogListData = await getBlogHomeList({ pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;
  const { userInfo } = ctx.session;

  // controller 获取粉丝列表
  const fanList = await getFanList({ userId: userInfo.id })
  console.log(fanList);

  await ctx.render('index', {
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
