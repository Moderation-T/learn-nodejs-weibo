/**
 * @description 博客首页 api 路由
 * @author 一只鱼
 */

const router = require('koa-router')();
const { create } = require('../../controller/blog-home');
const { loginCheckout } = require('../../middlewares/loginCheckout');
const { genValidator } = require('../../middlewares/validator');
const { blogValidator } = require('../../validator/blog');
const { getBlogHomeList } = require('../../controller/blog-home');
const { getBlogListStr } = require('../../utils/blog');

router.prefix('/api/blog');

// 新建微博
router.post('/create', loginCheckout, genValidator(blogValidator), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const userId = ctx.session.userInfo.id;

  ctx.body = await create({ userId, content, image });
});

// 加载d
router.get('/loadMore/:pageIndex', loginCheckout, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const list = await getBlogHomeList({ pageIndex });

  // 渲染模板
  list.data.blogListTpl = getBlogListStr(list.data.blogList);

  ctx.body = list;
});

module.exports = router;
