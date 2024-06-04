const mongoose = require("mongoose");

// create schema
const brandsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `brand name is required`],
        unique: [true, `brand name must be unique`],
        minlength: [2, `too short brand name  let it be between 2 and 32`],
        maxlength: [32, `too long brand name  let it be between 2 and 32`],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

// create the brand model with its schema
const brandsModel = mongoose.model("brand", brandsSchema)

module.exports = brandsModel;