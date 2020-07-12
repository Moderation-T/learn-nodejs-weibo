const { User } = require('../../database/model/index');

test('测试 User 模型各个属性是否符合预期', () => {
  const user = User.build({
    userName: 'testUserName',
    password: 'testPassword',
    nickName: 'testNickName',
    // gender 不添测试默认值是否有效
    city: 'beijing',
    picture: '/***.png',
  });

  expect(user.userName).toBe('testUserName');
  expect(user.password).toBe('testPassword');
  expect(user.nickName).toBe('testNickName');
  expect(user.gender).toBe(3);
  expect(user.city).toBe('beijing');
  expect(user.picture).toBe('/***.png');
});
