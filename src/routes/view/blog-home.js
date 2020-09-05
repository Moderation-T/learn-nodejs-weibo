/**
 * @description 微博首页 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogHomeList } = require('../../controller/blog-home');
const { getFanList, getFollowerList } = require('../../controller/user-relation')
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.get('/', async (ctx, next) => {
  // controller 获取微博列表
  const blogListData = await getBlogHomeList({ pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;
  const { userInfo } = ctx.session;

  // controller 获取粉丝列表 -> follower_id === userId 关注我的
  const fanListData = await getFanList({ userId: userInfo.id })
  const { count: fansCount, fanList } = fanListData.data

  // controller 获取关注人列表 user_id === userId 我关注的
  const followerListData = await getFollowerList({ userId: userInfo.id })
  const { count: followerCount, followerList } = followerListData.data


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
        count: fansCount,
        list: fanList,
      },
      followersData: {
        count: followerCount,
        list: followerList,
      },
      atCount: 0,
    },
  });
});

module.exports = router;
