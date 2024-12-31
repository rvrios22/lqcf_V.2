require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('lqcf', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const db = {}
db.sequelize = sequelize
db.models = {}
db.models.PDF = require('./pdf')(sequelize, Sequelize.DataTypes)
db.models.Study = require('./study')(sequelize, Sequelize.DataTypes)
db.models.Event = require('./event')(sequelize, Sequelize.DataTypes)
db.models.User = require('./user')(sequelize, Sequelize.DataTypes)

db.models.Study.hasMany(db.models.PDF)
db.models.PDF.belongsTo(db.models.Study)

module.exports = {
    db,
    PDF: db.models.PDF,
    Study: db.models.Study,
    Event: db.models.Event,
    User: db.models.User
}