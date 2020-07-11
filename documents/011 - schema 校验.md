> 引入校验工具 -> 定义模块校验规则 -> 定义校验中间件 -> 使用

```js
const Ajv = require('ajv');
const ajv = new Ajv({
  // allErrors: true // 输出所有的错误（比较慢）
});

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
}

module.exports = validate;
```

```js
// user.js
/**
 * @description 用户数据校验
 * @author 一只鱼
 */

const validator = require('./_validator');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
  },
};

function userValidator(data = {}) {
  return validator(SCHEMA, data);
}

module.exports = validator;
```

```js
/**
 * @description validator 验证中间件
 * @author 一只鱼
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo');
const { ErrorModel } = require('../model/ResModel');
const { validator } = require('sequelize/types/lib/utils/validator-extras');

/**
 *生成 json schema 验证中间件函数
 *
 * @param {Function} validateFn 验证函数
 */
function genValidator(validateFn) {
  async function validate(ctx, next) {
    const error = validateFn(ctx.request.body);
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
    }

    await next();
  }

  return validator;
}

module.exports = {
  genValidator,
};
```

```js
// router.js
router.post('/register', genValidator(userValidator), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  const result = await register({ userName, password, gender });
  ctx.body = result;
});
```
