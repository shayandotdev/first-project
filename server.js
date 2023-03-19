const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());
app.use(express.urlencoded());

app.use('/user', require('./routes/user'));
app.use('/passwords', require('./routes/passwords'));


mongoose.connect(process.env.mongodbURL, () => { console.log('db connected') });

const PORT = process.env.port || 3003

app.listen(PORT, () => { console.log('server started'); })