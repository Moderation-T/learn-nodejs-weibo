const { Blog } = require('../../database/model/index');

test('测试 Blog 数据模型各个属性是否符合预期', () => {
  const blog = Blog.build({
    userId: '11453234234',
    content: 'test content',
    image: '/***.png',
  });

  expect(blog.userId).toBe('11453234234');
  expect(blog.content).toBe('test content');
  expect(blog.image).toBe('/***.png');
});
