const { articleModel } = require('../lib/mysqlApi')
const Article = {
  async post (ctx) {
    const { title, content } = ctx.request.body
    if (!title || !content) {
      return ctx.body = {
        code: -1,
        msg: '缺少标题或者内容'
      }
    }
    let uid = ctx.session.uid
    let res = articleModel.postArticle(uid, title, content)
    if (res) {
      return ctx.body = {
        code: 0,
        msg: 'success'
      }
    } else {
      return ctx.body = {
        code: -2,
        msg: '发送文章失败'
      }
    }
  },
  async modify (ctx) {
    const { aid, title, content } = ctx.request.query
    if (!aid) {
      return ctx.body = {
        code: -1,
        msg: '请传入articleId'
      }
    }
    if (!title || !content) {
      return ctx.body = {
        code: -1,
        msg: '请传入文章标题或者内容'
      }
    }
    let res = articleModel.modifyArticle(title, content)
    console.log(res)
    if (res) {
      return ctx.body = {
        code: 0,
        msg: 'success'
      }
    } else {
      return ctx.body = {
        code: -2,
        msg: '修改失败，练习管理员'
      }
    }
  },
  async myArticle (ctx) {
    var uid = ctx.session.uid
    let res = articleModel.getMyArticle(uid)
    if (res) {
      return ctx.body = {
        code: 0,
        msg: 'success',
        data: res
      }
    } else {
      return ctx.body = {
        code: -2,
        msg: '数据库异常'
      }
    }
  },
  async allArticle () {
    let res = articleModel.getAllArticle()
    return ctx.body = {
      code: 0,
      msg: 'success',
      data: res
    }
  },
  async deleteArticle () {
    const { aid } = ctx.query.body
    if (!aid) {
      return ctx.body = {
        code: -1,
        msg: '缺少aid'
      }
    }
    let res = articleModel.deleteMyArticle(aid)
    if (res) {
      return ctx.body = {
        code: 0,
        msg: 'success'
      }
    } else {
      return ctx.body = {
        code: -2,
        msg: '删除文章失败'
      }
    }
  }
}

module.exports = Article
