/**
 * @description 个人空间 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogProfileList } = require('../../controller/blog-profile');
const { getCurrentUser } = require('../../controller/users')
const { getFanList } = require('../../controller/user-relation')
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.get('/profile', async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  // controller 获取微博列表
  const blogListData = await getBlogProfileList({ userName, pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;
  const { userInfo } = ctx.session;

  // 获取粉丝列表
  // controller 获取粉丝列表
  const fanListData = await getFanList({ userId: userInfo.id })
  const { count: fansCount, fanList } = fanListData.data

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
        count: fansCount,
        list: fanList,
      },
      followersData: {
        count: 0,
        list: [],
      },
      atCount: 0,
    },
  });
});

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params;
  const currentUserName = ctx.session.userInfo.userName
  const isMe = userName === currentUserName
  // controller 获取微博列表
  const blogListData = await getBlogProfileList({ userName, pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;

  // 当前用户信息
  const userInfoData = await getCurrentUser(userName)
  const userInfo = userInfoData.data

  // 获取粉丝列表
  const fanListData = await getFanList({ userId: userInfo.id })
  const { count: fansCount, fanList } = fanListData.data

  const amIFollowed = fanList.map(item => item.userName).includes(currentUserName)

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
        count: fansCount,
        list: fanList,
      },
      followersData: {
        count: 0,
        list: [],
      },
      atCount: 0,
      isMe,
      amIFollowed
    },
  });
});

module.exports = router;
