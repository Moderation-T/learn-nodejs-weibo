/**
 * @description 博客首页 api 路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { blogValidator } = require('../../validator/blog');
const { getBlogSquareCacheList } = require('../../cache/blog');
const { getBlogListStr } = require('../../utils/blog');
const { DEFAULT_PAGESIZE } = require('../../conf/constants');

router.prefix('/api/square');

// 加载更多
router.get('/loadMore/:pageIndex', loginCheckout, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const list = await getBlogSquareCacheList({ pageIndex, pageSize: DEFAULT_PAGESIZE });
  console.log('看看列表返回了什么', list);

  // 渲染模板
  list.data.blogListTpl = getBlogListStr(list.data.blogList);

  ctx.body = list;
});

module.exports = router;
