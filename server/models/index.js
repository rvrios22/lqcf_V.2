const Sequelize = require('sequelize')

const sequelize = new Sequelize('lqcf', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const db = {}
db.sequelize = sequelize
db.models = {}
db.models.PDF = require('./pdf')(sequelize, Sequelize.DataTypes)

module.exports = db