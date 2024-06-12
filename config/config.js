require('dotenv').config()

module.exports = {
  development: {
    username: process.env.SEQUELIZE_DB_USERNAME,
    password: process.env.SEQUELIZE_DB_PASSWORD,
    database: process.env.SEQUELIZE_DB_DATABASE,
    host: process.env.SEQUELIZE_DB_HOST,
    port: process.env.SEQUELIZE_DB_PORT,
    dialect: 'postgres',
  },
};