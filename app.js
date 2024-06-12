// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const DB = 'mongodb+srv://yg-28:Yash2824@cluster0.gs75d9a.mongodb.net/my_database?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connection Unsuccesfull');
}).catch((err) => console.log('no connection'));


// Define Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNo: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String
  },
  loginId: String,
  password: String,
  creationTime: { type: Date, default: Date.now },
  lastUpdateTime: { type: Date, default: Date.now }
});

// Create Model
const User = mongoose.model('User', userSchema);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
