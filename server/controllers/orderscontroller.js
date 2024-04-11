const Order = require('../models/orders');
const User = require('../models/user')

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send('Error retrieving orders from the database.');
  }
};


// Create order
// Create order
const createOrder = async (req, res) => {
  try {
    // Ensure all required fields are provided
    const { sender_name, receiver_name, goods_description, pickup_date, delivery_date } = req.body;
    if (!sender_name || !receiver_name || !goods_description || !pickup_date || !delivery_date) {
      return res.status(400).send('All fields are required');
    }

    // Find the user ID based on the sender name
    const user = await User.findOne({ where: { username: sender_name } });
    if (!user) {
      return res.status(400).send('Sender not found');
    }

    // Extract the user ID from the user object
    const user_id = user.getDataValue('user_id');

    // Update req.body to include user_id
    req.body.user_id = user_id;

    // Create order using req.body
    const order = await Order.create(req.body);
    res.send('Order placed successfully'); // Send success message
  } catch (error) {
    res.status(400).send(error.message);
  }
};




// Update order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found.');

    // Update order properties
    await order.update(req.body);
    console.log('order placed successfully')
    res.send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found.');

    await order.destroy();
    res.send(order);
  } catch (error) {
    res.status(500).send('Error deleting order.');
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send('Order not found.');

    res.send(order);
  } catch (error) {
    res.status(500).send('Error retrieving order.');
  }
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder, getOrderById };
