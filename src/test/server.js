/**
 * @description 为 jest 提供接口测试 server
 * @author 一只鱼
 */

const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);
