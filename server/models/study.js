module.exports = (sequelize, DataTypes) => {
    const Study = sequelize.define('study', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {})
    return Study
}