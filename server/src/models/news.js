const mongoose = require('mongoose');
const categories = require('./categories');

const NewsSchema = new mongoose.Schema(
 {
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 128,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 512,
        trim: true,
    },
    image_url: {
        type: String,
        trim: true,
    },
    news_url: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 512,
        trim:true,
    },
    category: {
        type: String,
        required: true,
        enum: categories,
    },
 },
 { 
    timestamps: true
 }
)

module.exports = mongoose.model('News', NewsSchema);