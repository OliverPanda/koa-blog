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

module.exports = query
