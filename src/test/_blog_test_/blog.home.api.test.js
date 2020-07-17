/**
 * @description blog-home 模块测试
 * @author 一只鱼
 */

const server = require('../server');
const { TEST_COOKIE } = require('../_testUserInfo');

/**
 * 新建博客 -> 加载更多
 * */

const COOKIE = TEST_COOKIE;

const newBlog = {
  content: `test Blog ${Date.now()}`,
  image: '/1594797719690-1.png',
};

// 新建博客
test('测试新建博客是否成功', async () => {
  const res = await server.post('/api/blog/create').send(newBlog).set('Cookie', COOKIE);

  const { data, errno } = res.body;

  expect(errno).toBe(0);
  expect(data.content).toBe(newBlog.content);
  expect(data.image).toBe(newBlog.image);
});

// 加载更多
test('测试加载首页的数据', async () => {
  const res = await server.get('/api/profile/loadMore/username/0').set('Cookie', COOKIE);

  const { errno, data } = res.body;
  expect(errno).toBe(0);
  // 返回的数据要含有这些属性
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('pageSize');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('count');
});
