const { userModel } = require('../lib/mysqlModal')
const md5 = require('md5')
const Index = {
  async login (ctx) {
    let { name, password } = ctx.request.query
    if (!name || !password) {
      return ctx.body = {
        code: -1,
        msg: '缺少用户名或者密码'
      }
    }
    let res = await userModel.getUserByName(name)
    if (res.length <= 0) {
      return ctx.body = {
        code: -2,
        msg: '用户不存在'
      }
    }
    if (name === res[0].name && md5(password) === res[0].password) {
      ctx.session = {
        user: res[0].name,
        uid: res[0].uid
      }
      return ctx.body = {
        code: 0,
        msg: '登陆成功'
      }
    } else {
      return ctx.body = {
        code: -1,
        msg: '用户名或者密码错误'
      }
    }
  },
  async logout (ctx) {
    ctx.session = {}
    return ctx.body = {
      code: 0,
      msg: '登出成功'
    }
  }
}

module.exports = Index