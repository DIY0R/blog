const {
    Router
} = require('express')
const {User } = require('../models/User')
const router = Router()

const jwt = require('jsonwebtoken');
const { validationResult ,check} = require('express-validator');
const bcrypt = require('bcrypt')
const config = require('config')
const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    }
    return jwt.sign(payload, config.get('jwtSecret'), {expiresIn: "24h"} )
} 

router.post('/register', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:12}),
    check('email','email должен быть волидным').normalizeEmail().isEmail()
],async (req,res)=>{

    try { 
    const {name,username,email,password} = req.body
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Ошибка при регистрации", errors})
        } 
         
        const candidate = await User.findOne({where:{email}})
        if(candidate){
             return res.status(400).json({message:'пользователь  существует  !',errors:false})
                
        } 
       
        const hashPassword =    bcrypt.hashSync(password, 7)
      await User.create({name,username,email,password:hashPassword})
     return res.json({message: "Пользователь успешно зарегистрирован"})

    } catch (errors) {
        return res.status(400).json({errors})
    }
    
})  

router.post('/login',async (req,res)=>{
    try {
        const  {email,password} = req.body
        const user = await User.findOne({where:{email}})
         if(!user) {
             return  res.status(400).json({message:'пользователь  не существует  !',errors:false})
            }
         const  match =  bcrypt.compareSync(password,user.password)
        if(!match) {
            return  res.status(400).json({message:'неправильный пароль !',errors:false})
         }
         const token =  generateAccessToken(user.id,user.username)
         res.json({message:'вы авторизован!',token})
    } catch (error) {
        return res.status(401).json({error})
    }
})

module.exports = router 