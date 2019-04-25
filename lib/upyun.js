const fs = require('fs')
const upyun = require('upyun')
const path = require('path')
const moment = require('moment')

const upyunConfig = {
  username: '',
  password: '',
  bucket: '',
  targetUrl: '',
  upyunUrl: ''
}

async function upload (file) {
  // 创建UPYUN服务
  let targetUrl = upyunConfig.targetUrl
  const services = new upyun.services(upyunConfig.bucket, upyunConfig.username, upyunConfig.password)
  const client = upyun.client(services)
  const reader = fs.createReadStream(file.path)
  let ext = file.name.split('.').pop()
  let basename = path.basename(file)
  // 拼接upyun储存的位置path, 直接用二进制流传到Upyun中，不需要像PHP一样先存本地
  var myPath = ''
  const writter = fs.createWriteStream(myPath)
  reader.pipe(writter)
  // 可读流, 有close, ready, open, end时间
  reader.on('end', () => {
    // 存储upyun成功, 确保有该文件，返回upyun链接
    if (fs.Stat(myPath)) {
      fs.closeSync(reader)
      fs.closeSync(writter)
    }
  })
}

async function base64Upload (img) {
  let ymd = moment().format('YYYYMMDD')
  var types = types ? types : ['jpg', 'gif', 'png', 'jpeg']
  img = img.replace(/_/g, '/')
  img = img.replace(/-/g, '+')
  // 去除前端传过来 base64 字符串中无用的前缀如 data:image/png;base64, 等等
  let b64img = img.substr(0, 100)
  let reg = /^(data:\s*image\/(\w+);base64,)/
  if (b64img.match(reg)) {
    let matches = b64img.match(reg)
    let type = matches[2]
    let inArr = types.filter(item => item === type)
    if (!inArr.length) {
      // 格式不正确
      return false
    }
    img = img.replace(matches[1], '')
    img = new Buffer(img, 'base64')
    let randomNum = Math.floor(Math.random() * 899 + 100)
    let ymdhis = moment().format('YYYYMMDDHHmmss')
    let photo = ymdhis + randomNum + '.' + type

    // upload to upyun
    const service = new upyun.Service(this.UPYUN_BUCKET, this.UPYUN_USERNAME, this.UPYUN_PASSWORD)
    const client = new upyun.Client(service)
    let data = await client.putFile(`/huodong/activity/${activity}/${photo}`, img)
    let upyunFilePath
    if (data) {
      upyunFilePath = `${this.UPYUN_URL}/huodong/activity/${activity}/${photo}`
    }
    return upyunFilePath
  }
  // 图片base64有问题
  return false
}

module.exports = {
  upload,
  base64Upload
}