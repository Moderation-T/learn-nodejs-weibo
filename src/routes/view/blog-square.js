/**
 * @description 个人空间 view 路由
 * @author 一只鱼
 */

const router = require('koa-router')();

const { getBlogSquareList } = require('../../controller/blog-square');
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.get('/square', async (ctx, next) => {
  // controller 获取微博列表
  const blogListData = await getBlogSquareList({ pageIndex: 0, pageSize: DEFAULT_PAGESIZE });

  const { isEmpty, blogList, count, pageIndex, pageSize } = blogListData.data;

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      count,
      pageSize,
      pageIndex,
    },
  });
});

module.exports = router;
