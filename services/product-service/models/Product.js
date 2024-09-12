const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [{ review: String, rating: Number, date: { type: Date, default: Date.now } }],
    image: { type: String },
    quantity:{type:Number,required:true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;