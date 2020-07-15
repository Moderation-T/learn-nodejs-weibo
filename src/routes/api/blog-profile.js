/**
 * @description 个人空间 api 路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const { create } = require('../../controller/blog-home');
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { genValidator } = require('../../middlewares/validator');
const { blogValidator } = require('../../validator/blog');
const { getBlogProfileList } = require('../../controller/blog-profile');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/profile');

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheckout, async (ctx, next) => {
  let { pageIndex, userName } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const list = await getBlogProfileList({ pageIndex, userName });

  // 渲染模板
  list.data.blogListTpl = getBlogListStr(list.data.blogList);

  ctx.body = list;
});

module.exports = router;
