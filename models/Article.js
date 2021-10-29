
const sequelize = require('../db/db')
const {DataTypes} = require('sequelize')

const Article = sequelize.define('article',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING , allowNull: false},
    text:{type: DataTypes.TEXT , allowNull: false},
    date:{type: DataTypes.STRING },
    photo:{type: DataTypes.STRING,allowNull: false},
  
}) 
  



module.exports = {Article}

 