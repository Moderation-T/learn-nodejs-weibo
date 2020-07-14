/**
 * @description utils router
 * @author 一只鱼
 */

const router = require('koa-router')();
const { loginCheckout } = require('../../middlewares/loginCheckout');
const koaForm = require('formidable-upload-koa');
const { uploadFile } = require('../../controller/utils');

router.prefix('/api/utils');

// 上传文件
router.post('/upload', loginCheckout, koaForm(), async (ctx, next) => {
  const { name, type, path, size } = ctx.req.files.file;

  ctx.body = await uploadFile({ name, type, size, filePath: path });
});


module.exports = router;
