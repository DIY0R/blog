const {DataTypes} = require('sequelize');
const sequelize = require('../db/db')



const User = sequelize.define('users',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  

  email: {type: DataTypes.STRING,allowNull: false, unique: true},
    
  password: {type: DataTypes.STRING, allowNull: false},
  
})
sequelize.sync().catch(error=>console.error())
 
module.exports ={User}




