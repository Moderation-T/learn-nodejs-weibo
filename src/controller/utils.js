/**
 *
 * @description utils controller
 * @author 一只鱼
 */

const fse = require('fs-extra');
const path = require('path');

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const { exists } = require('fs-extra');

/**
 * 文件上传
 *
 * @param {Object} {name,type,size,filePath} {文件名称，文件类型，文件大小，文件默认路径}
 */

const MAX_SIZE = 1024 * 1024 * 1024; // 1M

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');

// 如果存储目录不存在则创建目录
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

async function uploadFile({ name, type, size, filePath }) {
  // 如果文件大小超过默认最大值
  if (size > MAX_SIZE) {
    // 删除这个文件
    await fse.remove(path);
    new ErrorModel(uploadFileSizeFailInfo);
  }

  // 将上传的图片存到指定的文件夹
  // 重命名文件并防止重名
  const fileName = `${Date.now()}-${name}`;
  // 指定的文件目录
  const distFilepath = path.join(DIST_FOLDER_PATH, fileName);
  // 进行移动
  await fse.move(filePath, distFilepath);

  // 返回信息
  return new SuccessModel({ url: `/${fileName}` });
}

module.exports = {
  uploadFile,
};
