const query = require('./dbApi')

let getUserByName = name => {
  let _sql = `select * from users where name = '${name}'`
  return query(_sql, name)
}
let regUser = (name, psw) => {
  let _sql = `insert into users (name, password) values ('${name}', '${psw}')`
  return query(_sql, (name, psw))
}

let getUserByUid = uid => {
  let _sql = `select * from users where uid = '${uid}'`
  return query(_sql, uid)
}

let postArticle = (title, content, file) => {
  let _sql = `insert into articles (title, content) values ('${title}', '${content}')`
  return query(_sql, (title, content))
}
let modifyArticle = (title, content) => {
  let _sql = `update articles set title='${title}',content='${content}'`
  return query(_sql, (title, content))
}
let getMyArticle = (uid) => {
  let _sql = `select * from aricles where uid = '${uid}'`
  return query(_sql, uid)
}
let getAllArticle = () => {
  let _sql = `select * from aricles`
  return query(_sql)
}
let deleteMyArticle = (aid) => {
  let _sql = `delete from articles where aid = '${aid}'`
  return query(_sql, aid)
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

module.exports = {
  userModel,
  articleModel
}