- 单元测试

  > 单个功能或接口，给定输入，得到输出。看输出是否符合要求。
  > 需要手动编写用例代码，然后统一执行
  > 意义：可以一次性执行所有单测，短时间内验证所有功能是否正常

- jest

  > 运行 .test.js 文件 --runInBand 按顺序执行 --forceExit 强制退出 --colors 分颜色输出
  > 常用的断言
  > 测试 HTTP 接口

```js
// 一个简单的使用 demo
test('测试描述', () => {
  const res = 10 + 20;
  expect(res).toBe(30);
});

// 测试接口
// server.js
const request = require('supertest');
const server = require('../src/app');

module.exports = request(server);

// json.test.js
const server = require('./server');

test('测试 /json 接口', async () => {
  const res = await server.get('/json');
  expect(res.body).toEqual({});

  const resPost = await server.post('/login').send({ username, password });
});
```

- 测试接口
