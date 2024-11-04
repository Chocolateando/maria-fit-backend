require('dotenv').config();
const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI;

module.exports = () => {
    const connect = () => {
        mongoose.connect(DB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error(err));
    }
    connect();
}