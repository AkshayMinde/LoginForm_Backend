const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../models/login');

router.post('/register', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const existingUser = await Login.findOne({ email });
      if (existingUser) {
        return res.json({ message: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newLogin = new Login({ email, password: hashedPassword });
      await newLogin.save();
  
      const token = jwt.sign({ userId: newLogin._id }, 'secretKey');
      res.json({ token });
    } catch (error) {
      res.json({ message: 'An error occurred' });
      console.log(error);
    }
});

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const loggedIn = await Login.findOne({ email });
    if (!loggedIn) {
      return res.json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, loggedIn.password);
    if (!passwordMatch) {
      return res.json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: loggedIn._id }, 'secretKey');
    res.json({ token });
  } catch (error) {
    res.json({ message: 'An error occurred' });
    console.log(error);
  }
});

module.exports = router;