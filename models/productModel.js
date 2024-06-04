const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        require: true,
        trim: true
    },
    priceAfterDiscount: {
        type: Number,
        trim: true
    },
    colors: {
        type: [String]
    },
    images: {
        type: [String]
    },
    imageCover: {
        type: String,

    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    subcategory: [{
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",

    }],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "brand",
    },
    ratingsAverage: {
        type: Number,
    },
    ratingQuantity: {
        type: Number,
        default: 9
    }

}, { timestamps: true })

const productModel = mongoose.model("Product", productSchema)


module.exports = productModel