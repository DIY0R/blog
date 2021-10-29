const {
    Router
} = require('express')
const path = require('path')
const config = require('config')
const uuid = require('uuid')
const {
    Article 
} = require('../models/Article')
const router = Router()
const transporter = require('../index.js')

router.post('/blog_add', async (req, res) => {
    try {
        const { title,text,admin } = req.body
        if (admin == config.get('my_sort')) {

            const {
                img
            } = req.files

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName), error => {
                if (error) {
                    res.status(400).json(error)
                }
            }) 

            await Article.create({title,  text,   date: new Date().toLocaleString().split(',')[0],photo: fileName})
            return res.json({
                status: 'ok'
            })
        }
        return res.status(500).json({
            message: 'У вас нет доступа !'
        })
    } catch (error) {

        res.status(400).json({
            name: 'errr',
            error
        })
    }

})


router.get('/blog', async (req, res, next) => {
    try {
        const {limit} = req.query
       
        let posts = await Article.findAndCountAll({ limit: +limit,})
        
        res.json(posts)
    } catch (error) {
        res.status(200).status(400).json({
            error
        })
    } 
})

module.exports = router