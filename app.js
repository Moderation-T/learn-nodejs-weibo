const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const morgan = require('koa-morgan');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const { SESSION_SECRET_KEY } = require('./src/conf/constants');
const { REDIS_CONF } = require('./src/conf/database');

const usersViewRouter = require('./src/routes/view/users');
const usersApiRouter = require('./src/routes/api/users');
const errorViewRouter = require('./src/routes/view/error');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(require('koa-static')(__dirname + '/src/public'));

app.use(
  views(__dirname + '/src/views', {
    extension: 'ejs',
  })
);

// logger
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  // 开发或测试环境
  app.use(morgan('dev'));
} else {
  // 生产环境
  const logFileName = path.join(__dirname, 'src', 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a',
  });
  app.use(
    morgan('combined', {
      stream: writeStream,
    })
  );
}

// session
app.keys = [SESSION_SECRET_KEY];
app.use(
  session({
    key: 'weibo:sid',
    prefix: 'weibo:sess',
    // 配置cookie
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    // 配置redis
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// routes
app.use(usersViewRouter.routes(), usersViewRouter.allowedMethods());
app.use(usersApiRouter.routes(), usersApiRouter.allowedMethods());
// 错误处理的路由 一定要放在最后面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
