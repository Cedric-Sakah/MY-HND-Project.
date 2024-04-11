const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize-config'); // Import Sequelize instance
const session = require('express-session');
const cors = require('cors');

const user = require('./routes/Users'); // Assuming routes still handle user logic
const login = require('./routes/login'); // Assuming routes still handle login logic
const Order = require('./routes/orders');

const app = express();

app.use(session({
  secret: 'GTMS',
  resave: false,
  saveUninitialized: true
}));

app.use(cors()); // Enable CORS for all origins

// Other middleware and route definitions
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync models with database
sequelize.sync()
  .then(() => console.log('Models synced successfully'))
  .catch(err => console.error('Error syncing models:', err));

// Routes
app.use('/api/users', user);
app.use('/api/login', login); // Corrected path
app.use('/api/orders', Order);
app.listen(3000, () => console.log('Server listening on port 3000'));
