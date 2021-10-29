const {Sequelize} = require('sequelize')
const config = require('config')

module.exports = new Sequelize(
    config.get('db_name') , // Название БД
    config.get('db_user'), // Пользователь
    config.get('db_password'), //  ПАРОЛЬ
    {
        dialect:'postgres', 
        host: config.get('db_host'),
        port: config.get('db_port'),
         logging: false
    }
   
)
 