module.exports = {
  db: {
    user: 'root',
    password: '123456',
    database: 'my-blog',
    host: 'localhost',
    port: '3306'
  },
  session: {
    key: 'login',
    maxAge: 86400,
    renew: true
  }
}