const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    "padaria", "root", "", {
        host: "localhost",
        dialect: "mysql"
    }
)

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
