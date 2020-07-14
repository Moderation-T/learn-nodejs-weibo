/**
 * @description 用户相关 api 测试包括：/register; /login; /isExist; /deleteUser 这些接口
 * @author 一只鱼
 */

const server = require('../server');

//  注册信息
const user = {
  userName: `u_${Date.now()}`,
  password: `u_${Date.now()}`,
  gender: 3,
};

let COOKIE = '';

/**
 * @description 测试流程
 * 用户注册 -> 若重复注册应注册不成功  -> 判断用户是否存在应存在 -> 登陆 json schema 验证 -> 用户登陆  -> 修改用户信息  -> 修改密码  -> 删除用户  -> 退出登陆  ->  再次判断用户是否存在应不存在
 * */

// 用户注册
test('验证注册是否通过', async () => {
  const res = await server.post('/api/user/register').send(user);

  expect(res.body.errno).toBe(0);
});

// 用户是否存在
test('测试注册成功后验证用户是否存在，应存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName: user.userName });

  expect(res.body.errno).toBe(0);
});

// 重复注册
test('测试用户已存在的情况下，重复登录，应注册失败', async () => {
  const res = await server.post('/api/user/register').send(user);

  expect(res.body.errno).not.toBe(0);
});

// json schema 验证
test('输入非法用户名测试登陆，应登陆失败', async () => {
  const testUser = {
    userName: '1',
    password: 'test',
  };
  const res = await server.post('/api/user/register').send(testUser);

  expect(res.body.errno).not.toBe(0);
});

// 用户登陆
test('测试用户登陆是否成功', async () => {
  const res = await server.post('/api/user/login').send({ userName: user.userName, password: user.password });

  expect(res.body.errno).toBe(0);

  // 设置 cookie 使得删除操作可以通过登陆验证
  COOKIE = res.headers['set-cookie'].join(';');
});

// 修改用户信息 json schema 验证
test('输入非法的用户信息修改信息应该失败', async () => {
  const newUserInfo = {
    city: '1',
    nickName: 'oneFish',
    picture: '/tiancai.png',
  };

  const res = await server.post('/api/user/changeInfo').send(newUserInfo).set('Cookie', COOKIE);
  expect(res.body.errno).not.toBe(0);
});

// 修改用户信息
test('测试用户修改信息是否成功', async () => {
  const newUserInfo = {
    city: 'dalian',
    nickName: 'oneFish',
    picture: '/tiancai.png',
  };
  const res = await server.post('/api/user/changeInfo').send(newUserInfo).set('Cookie', COOKIE);

  expect(res.body.errno).toBe(0);
});

// 修改用户密码
test('测试用户修改密码是否成功', async () => {
  const newPasswordMsg = {
    password: user.password,
    newPassword: 'newPassword123456',
  };

  const res = await server.post('/api/user/changePassword').send(newPasswordMsg).set('Cookie', COOKIE);

  expect(res.body.errno).toBe(0);
});

// 删除用户
test('登陆测试成功后删除用户，避免数据库中存入不必要的测试数据', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE);

  expect(res.body.errno).toBe(0);
});

// 退出登陆
test('测试退出登陆是否成功', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE);

  expect(res.body.errno).toBe(0);
});

// 验证用户是否存在
test('删除后测试用户是否存在，应不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName: user.userName });

  expect(res.body.errno).not.toBe(0);
});
