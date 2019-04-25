const { commentModel } = require('../lib/mysqlModal') 
class Comment {
  // 1.发表新评论 --- cid, title, content  
  //  2.删除评论 --- author有权限, 参数(articleid)  
  //  3.获取文章下的评论 (cid) 

  async getComments (ctx) {
    var { parentid, count } = ctx.query.body
    if (!parentid) {
      return ctx.body = {
        code: -1,
        msg: '没有cid'
      }
    }
    var uid = ctx.session.uid
    // 是否是作者，是作者可以删除
    var isAuthor
    if (+uid === +parentid) {
      isAuthor = 1
    }
    // 无论是否有count都传入， sql有对count做判断
    var result = await commentModel.getComments(parentid, count)
    return ctx.body = {
      code: 0,
      data: {
        comments: result,
        isAuthor: isAuthor
      },
      msg: 'success'
    }
  }
  async postComment (ctx) {
    var { cid, title, content } = ctx.request.body
    if (!title || !content) {
      return ctx.body = {
        code: -1,
        msg: '缺少参数'
      }
    }
    var result = await commentModel.sendComment()
    if (!result) {
      return ctx.body = {
        code: -1,
        msg: '插入数据失败'
      }
    }
    return ctx.bdoy = {
      code: 0,
      msg: '发表成功'
    }
  } 
  async deleteComment (ctx) {
    var id = ctx.query.id // 评论的id
    var uid = ctx.session.uid
    var result = await commentModel.getCommentById(id)
    if (!result) {
      return ctx.body = {
        code: -1,
        msg: '没有读取到该id对应的评论，检查是否传错id'
      }
    }
    var cid = (result && result.cid) || result[0].cid
    if (result.cid !== uid) {
      return ctx.body = {
        code: -1,
        msg: '不是作者, 不能删除'
      }
    }
    var deleteResult = await commentModel.deleteComment()
    if (!deleteResult) {
      return ctx.body = {
        code: -1,
        msg: '删除失败，具体询问管理员'
      }
    }
    return ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  }
}

module.exports = Comment