const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect("gmongodb+srv://test:sparta@cluster0.rx7dw.monodb.net/minipjt?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;