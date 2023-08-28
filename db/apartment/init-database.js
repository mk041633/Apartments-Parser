const mongoose = require('mongoose')

const initDatabase = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/krisha', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
};

module.exports = { initDatabase }