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
