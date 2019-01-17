const router = require('koa-router')()
var Index = require('../Controller/index')
var User = require('../Controller/user')
var checkLogin = require('../middleware/checkLogin')

router.get('/login', Index.login)
router.get('/logout', Index.logout)
router.post('/user/reg', User.reg)
router.use(checkLogin)
router.get('/user/info', User.userinfo)

module.exports = router
