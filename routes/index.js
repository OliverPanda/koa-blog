const router = require('koa-router')()
var Index = require('../Controller/index')
var User = require('../Controller/user')
var Article = require('../Controller/article')
var checkLogin = require('../middleware/checkLogin')

router.get('/login', Index.login)
router.get('/logout', Index.logout)
router.post('/user/reg', User.reg)
router.use(checkLogin)
router.get('/user/info', User.userinfo)

router.post('/article/post', Article.post)
router.get('/article/modify', Article.modify)
router.get('/article/myArticle', Article.myArticle)
router.get('/article/allArticle', Article.allArticle)
router.get('/article/deleteArticle', Article.deleteArticle)

module.exports = router
