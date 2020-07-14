const router = require('koa-router')();
const { loginCheckout } = require('../../middlewares/loginCheckout');
const koaForm = require('formidable-upload-koa');

router.prefix('/api/util');

router.post('/upload', loginCheckout, koaForm(), (ctx, next) => {
  console.log(ctx.request);
});

module.exports = router;
