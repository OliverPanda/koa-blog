const mysql = require('koa-mysql')
const config = require('../config/config')

const pool = mysql.createPool(config.db)
// 封装数据库连接失败直接报错
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
/*
用户表
uid, name, password, avatar, create_time, update_time

文章表-articles
aid, title, content, uid, pv(浏览量), reply(评论数), create_time

评论表-comments
cid, aid, admire(赞), despise(踩), content, create_time
*/

let users = `
  create table if not exists users(
    uid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL COMMENT '用户姓名',
    password VARCHAR(32) NOT NULL COMMENT '用户密码, md5-32位',
    avatar VARCHAR(1024) NOT NULL COMMENT '头像,base64',
    create_time DATETIME COMMENT '注册时间',
    update_time DATETIME COMMENT '更新时间',
    PRIMARY KEY (uid)
  ) 
`

let articles = `
  create table if not exists articles(
    aid INT NOT NULL AUTO_INCREMENT,
    uid INT NOT NULL COMMENT '发表文章的用户id',
    title TEXT(0) NOT NULL COMMENT '文章标题',
    content TEXT(0) NOT NULL COMMENT '文章内容',
    create_time DATETIME COMMENT '文章发表时间',
    pv INT NOT NULL DEFAULT '0' COMMENT '浏览量',
    reply INT NOT NULL DEFAULT '0' COMMENT '评论数',
    PRIMARY KEY (aid)
  )
`

let comments = `
  create table if not exists comments(
    cid INT NOT NULL AUTO_INCREMENT,
    aid INT NOT NULL COMMENT '发表评论的用户',
    content TEXT(0) NOT NULL COMMENT '评论内容',
    admire INT NOT NULL DEFAULT '0' COMMENT '点赞数',
    despise INT NOT NULL DEFAULT '0' COMMENT '踩的数量',
    create_time DATETIME COMMENT '评论发表时间',
    PRIMARY KEY (cid)
  )
`

let createTable = (sql) => {
  return query(sql, [])
}
// 创建表
createTable(users)
createTable(articles)
createTable(comments)

module.exports = query
