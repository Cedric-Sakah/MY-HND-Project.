
const mongoose = require('mongoose');
const user = require('./routes/Users');
const login = require('./routes/login')
const shipment = require('./routes/shipment')

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/MyhndProjectDb')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...',err));

 

app.use('/api/users', user);
app.use('/api/login',login);
app.use('/api/shipments',shipment)



app.listen(3000, () => console.log('listening on port 3000...'));
