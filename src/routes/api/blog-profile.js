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
const { follow, unFollow } = require('../../controller/user-relation')

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

// 关注
router.post('/follow', loginCheckout, async (ctx, next) => {
  // 自己的 id
  const { id: myUserId } = ctx.session.userInfo;
  // 当前查看用户的 id
  const { userId: currentId } = ctx.request.body
  // controller 建立关联关系
  const res = await follow(myUserId, currentId)
  ctx.body = res
})

// 取消关注
router.post('/unFollow', loginCheckout, async (ctx, next) => {
  // 自己的 id
  const { id: myUserId } = ctx.session.userInfo;
  // 当前查看用户的 id
  const { userId: currentId } = ctx.request.body
  // controller 取消关联关系
  const res = await unFollow(myUserId, currentId)
  ctx.body = res
})


module.exports = router;
