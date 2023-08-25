const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log('db connected');
})
.catch((error) => {
    console.log(error);
})

const app = express();
app.use(express.json());
app.use(cors());

// routes
const login = require('./routers/login');
app.use(login);

app.get('/', (req,res)=>{
    res.send('working');
})



const port = process.env.PORT || 3001;
app.listen(port, (req, res)=>{
    console.log(`Server is working`);
})