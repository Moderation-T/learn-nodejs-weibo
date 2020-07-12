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

/**
 * @description 测试流程
 * 用户注册 -> 若重复注册应注册不成功  -> 判断用户是否存在应存在  -> 用户登陆  -> 删除用户  -> 再次判断用户是否存在应不存在
 * */

test('验证注册是否通过', async () => {
  const res = await server.post('/api/user/register').send(user);

  except(res.errno).toBe(0);
});

test('测试注册成功后验证用户是否存在，应存在', async () => {
  const res = await server.post('/api/user/isExist').send(user.userName);

  except(res.errno).toBe(0);
});

test('测试用户已存在的情况下，重复登录，应注册失败', async () => {
  const res = await server.post('api/user/register').send(user);

  expect(res.errno).not.toBe(0);
});

test('测试用户登陆是否成功',async ()=>{
  const res = await server.post('api/user/login').send({userName:user.userName,password:user.password})

  expect(res.errno).toBe(0)
