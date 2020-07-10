const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

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
app.use(logger());
app.use(require('koa-static')(__dirname + '/src/public'));

app.use(
  views(__dirname + '/src/views', {
    extension: 'ejs',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

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
