module.exports = (sequelize, DataTypes) => {
    const PDF = sequelize.define('pdf', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pdfPath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        }, 
    }, {})
    return PDF
}