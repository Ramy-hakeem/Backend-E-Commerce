const mongoose = require("mongoose")

// Create Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `category required`],
        unique: [true, `category must be unique`],
        minLength: [2, "Too short category name"],
        maxLength: [32, "Too long category name"]
    },
    // Iphone Speaker => shopin.com/iphone-speaker
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true })

// Create Model
const CategoryModel = mongoose.model(`Category`, categorySchema)

module.exports = CategoryModel;