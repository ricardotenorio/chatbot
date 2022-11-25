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
        required:true,
        minlength: 10,
        trim: true,
    },
    news_url: {
        type: String,
        required: true,
        minlength: 10,
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
);

NewsSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

module.exports = mongoose.model('News', NewsSchema);