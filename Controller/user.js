const { userModel } = require('../lib/mysqlModal')
const md5 = require('md5')
const User = {
  async reg (ctx) {
    var { name, password } = ctx.request.body
    let result = await userModel.getUserByName(name)
    if (result.length > 0) {
      return ctx.body = {
        code: -2,
        msg: '相同的用户名，注册失败'
      }
    }
    let res = await userModel.regUser(name, md5(password))
    if(res) {
      return ctx.body = {
        code: 0,
        msg: '注册成功'
      }
    } else {
      return ctx.body = {
        code: -3,
        msg: '注册失败，请联系管理员'
      }
    }
  },
  async userinfo (ctx) {
    let { name } = ctx.request.query
    let res = await userModel.getUserByName(name)
    if (res.length > 0) {
      return ctx.body = {
        code: 0,
        msg: 'success',
        data: res
      }
    } else {
      return ctx.body = {
        code: -1,
        msg: '没有该用户'
      }
    }
  }
}

module.exports = User
