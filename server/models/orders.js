// Import Sequelize and the connection instance
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

// Define the Order model
const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the referenced table
      key: 'user_id' // Name of the referenced column in the users table
    }
  },
  origin_address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  destination_address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  pickup_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  delivery_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  goods_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pickup_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  receiver_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  receiver_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  receiver_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sender_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
},
{
  timestamps: false // Disable timestamps for this model
});

// Export the Order model
module.exports = Order;
