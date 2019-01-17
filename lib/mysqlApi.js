const query = require('./dbApi')

let insertUser =  (values) => {
  let _sql = `insert into users set name = ?, password = ?, avatar = ?, gender = ?`
  return query(_sql, values)
}
let getUserByName = name => {
  let _sql = `select * from users where name = '${name}'`
  return query(_sql, name)
}
let regUser = (name, psw) => {
  let _sql = `insert into users (name, password) values ('${name}', '${psw}')`
  return query(_sql, (name, psw))
}

let userModel = {
  insertUser,
  getUserByName,
  regUser
}

module.exports = {
  userModel
}