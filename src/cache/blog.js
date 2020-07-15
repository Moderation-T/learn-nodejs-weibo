/**
 * @description redis 缓存
 * @author 一只鱼
 */

const { CACHE_KEY_PREFIX } = require('../conf/constants');
const { get, set } = require('./_redis');

const { getBlogSquareList } = require('../controller/blog-square');
/**
 * 获取微博广场微博缓存列表
 *
 * @param {*} { pageIndex, pageSize }
 */
async function getBlogSquareCacheList({ pageIndex, pageSize }) {
  const redisKey = `${CACHE_KEY_PREFIX}-${pageIndex}-${pageSize}`;

  // 尝试获取缓存
  const cacheResult = await get(redisKey);
  if (cacheResult) {
    return cacheResult;
  }

  // 没有缓存重新去数据库请求并保存
  const list = await getBlogSquareList({ pageIndex, pageSize });
  set(redisKey, list, 60);

  return list;
}

module.exports = {
  getBlogSquareCacheList,
};
