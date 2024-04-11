// sequelize-config.js
const { Sequelize } = require('sequelize');

const serverName = 'localhost';
const username = 'root';
const password = '';
const dbname = 'goods_transportationmsdb';

const sequelize = new Sequelize(dbname, username, password, {
  host: serverName,
  dialect: 'mysql'
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
