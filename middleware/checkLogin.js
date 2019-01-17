module.exports = async (ctx, next) => {
  if (ctx.session.uid) {
    next()
  } else {
    return ctx.body = {
      code: -5,
      msg: '登陆超时或者未登陆'
    }
  }
}
