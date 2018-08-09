var mongoose = require('mongoose');
var documentSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    },
    img: String,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }


});

module.exports = mongoose.model('Product', documentSchema);