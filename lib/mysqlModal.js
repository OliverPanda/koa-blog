const query = require('./dbQuery')

let getUserByName = name => {
  let _sql = `select * from users where name = '${name}'`
  return query(_sql)
}
let regUser = (name, psw) => {
  let _sql = `insert into users (name, password) values ('${name}', '${psw}')`
  return query(_sql)
}

let getUserByUid = uid => {
  let _sql = `select * from users where uid = '${uid}'`
  return query(_sql)
}

let postArticle = (uid, title, content) => {
  let _sql = `insert into articles (uid, title, content) values ('${uid}', ${title}', '${content}')`
  return query(_sql)
}
let modifyArticle = (title, content) => {
  let _sql = `update articles set title='${title}',content='${content}'`
  return query(_sql)
}
let getMyArticle = (uid) => {
  let _sql = `select * from articles where uid = '${uid}'`
  return query(_sql)
}
let getCatagoryArticle = (type) => {
  let _sql = `select * from articles where type=?`
  return query(_sql, type)
}
let getAllArticle = () => {
  let _sql = `select * from articles`
  return query(_sql)
}
let deleteMyArticle = (aid) => {
  let _sql = `delete from articles where aid = '${aid}'`
  return query(_sql)
}

let sendComment = (cid, title, content) => {
  let _sql = `insert into comments (cid, title, content) values ('${cid}', ${title}', '${content}')`
  return query(_sql)
}
let getComments = (cid, count) => {
  let _sql
  _sql = count ? `select * from comments` : `select * from comments limit ${count}`
  return query(_sql)
}
let getCommentById = (id) => {
  let _sql = `select * from comments where id = ?`
  return query(_sql, id)
}
let deleteComment = (id) => {
  let _sql = `delete from comments where id = ?`
  return query(_sql, id)
}

let userModel = {
  getUserByName,
  getUserByUid,
  regUser
}

let articleModel = {
  postArticle,
  modifyArticle,
  getMyArticle,
  getAllArticle,
  deleteMyArticle
}
let commentModel = {
  sendComment,
  getComments,
  getCommentById,
  deleteComment
}

module.exports = {
  userModel,
  articleModel
}