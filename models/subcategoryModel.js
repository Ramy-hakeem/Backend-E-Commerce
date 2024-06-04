const mongoose = require("mongoose");



const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, "the subcategory name must be unique"],
        minlength: [2, "Too short subcategory name"],
        maxlength: [32, "Too long subcategory name"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "subcategory must belong to main category"]
    }
}, { timestamps: true }
)
const SubcategoryModel = mongoose.model("Subcategory", subcategorySchema)

module.exports = SubcategoryModel