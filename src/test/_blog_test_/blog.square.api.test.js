/**
 * @description blog-square 模块测试
 * @author 一只鱼
 */

const server = require('../server');
const { TEST_COOKIE, TEST_USERNAME } = require('../_testUserInfo');

/**
 *  加载更多
 * */

const COOKIE = TEST_COOKIE;
const USERNAME = TEST_COOKIE;

// 加载更多
test('测试加载个人主页的数据', async () => {
  const res = await server.get(`/api/square/loadMore/0`).set('Cookie', COOKIE);

  const { errno, data } = res.body;
  expect(errno).toBe(0);
  // 返回的数据要含有这些属性
  expect(data).toHaveProperty('isEmpty');
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('pageSize');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('count');
});
