> ORM - Object Relational Mapping
> 数据表，用 JS 的模型代替
> 一条或多条记录，用 JS 中的一个对象或数组代替
> sql 语句，用对象方法代替

- 建模（外键） 同步到数据库

```js
// yarn add sequelize

// seq.js 建立连接
const Sequelize = require('sequelize');

const seq = new Sequelize('learn-node', 'root', 'root123456', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = seq;
```

```js
// model.js 建模
const Sequelize = require('sequelize');
const seq = seq('./seq');

// 创建 User 模型 数据表的表名会自动生成为 users
const User = req.define('user', {
  // id 会自动创建，并设为主键、自增
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '昵称',
  },
});

const Blog = req.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// 关联外键
// 多对一的关系
Blog.belongsTo(User, {
  foreignKey: 'userId',
});

// 一对多的关系
User.hasMany(Blog, {
  foreignKey: 'userId',
});

module.exports = {
  User,
  Blog,
};
```

```js
// 同步
const seq = seq('./seq');
require('./model');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('ok');
  })
  .catch(() => {
    console.log('err');
  });

// 执行同步
seq.sync({ force: true }).then(() => {
  process.exit();
});
```

- 增删改查 连表查询

```js
// insert
const { Blog, User } = require('./model');

!(async function () {
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123456',
    nickName: '张三',
  });
})();

// select
!(async function () {
  // 查询一条记录
  const zhangsan = await User.findOne({
    where: { userName: 'zhangsan' },
  });

  // 查询特定的列
  const zhangsan = await User.findOne({
    attribute: ['userName'], // 查询 userName 这一列
    where: { userName: 'zhangsan' },
  });
})();

!(async function () {
  // 查询多条记录
  const zhangsan = await User.findAll({
    where: { userId: 1 },
    order: [['id', 'desc']],
  });
})();

// 分页
!(async function () {
  // 查询10条记录
  const blogPageList = await User.findAll({
    limit: 10,
    offset: 0,
    where: { userId: 1 },
    order: [['id', 'desc']],
  });
})();

// 查询总是
!(async function () {
  // 查询10条记录 并且返回总数
  const blogPageList = await User.findAndCountAll({
    limit: 10,
    offset: 0,
    where: { userId: 1 },
    order: [['id', 'desc']],
  });
})();

// update

// delete

console.log((zhangsan = zhangsan.dataValue));
```
