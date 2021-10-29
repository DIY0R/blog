const {
    Router
} = require('express')
const router = Router()

 

router.use('/article',require('./article.routes'))
router.use('/',require('./Images.routes'))
router.use('/auth',require('./auth.routes'))




module.exports = router







