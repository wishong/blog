const qiniu = require('qiniu');

const accessKey = 'tH5uhnduPnKGnCaiFlHRRhoo-plCTeYNPyjp99AS'
const secretKey = 'a6LF5QgEBPDZy5pSHkhkPwldU74kTPvol9nv6psu'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'blog4pro',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = uploadToken;