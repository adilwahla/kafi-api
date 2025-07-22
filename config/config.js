require('dotenv').config(); // Loads your .env file

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  },
  test: {
    // optional test config
  },
  production: {
    // optional production config
  }
};
