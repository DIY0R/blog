const {Router} = require('express')
const path = require('path')
const fs = require('fs')
const router = Router()

router.get('/random_images',(req,res)=>{
    try {
       const dir = path.resolve(__dirname, '../images')
    fs.readdir(dir, (err, files) => {
        if(files.length >0) return  res.end( JSON.stringify( files))
        return res.status(400).json({err:'нету изображений '})
      })   
    } catch (error) {
        return res.status(500).json({err:error})
    }
   
})

module.exports = router 