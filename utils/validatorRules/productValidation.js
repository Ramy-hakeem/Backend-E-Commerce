const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const productModel = require("../../models/productModel");
const subcategoryModel = require("../../models/subcategoryModel")

exports.createProdctValidation = [
    check("name")
        .notEmpty().withMessage("the product name is required")
        .isLength({ min: 2 }).withMessage("the product name must be atleast 3 chars")
        .custom(async (name) => {
            const productName = await productModel.findOne({ name })
            if (productName) {
                throw new Error("this product name already exist ")
            }
            return true
        }),
    check("description")
        .notEmpty().withMessage("the product description is required")
        .isLength({ max: 2000 }).withMessage("to long description"),
    check("quantity")
        .notEmpty().withMessage("product quantity is required")
        .isNumeric().withMessage("product quantity must be a number type"),
    check("sold")
        .optional()
        .isNumeric().withMessage("product sold number shold be a number type"),
    check("price")
        .notEmpty().withMessage("product price is required")
        .isNumeric().withMessage("product price shold be a number type")
        .toFloat()
        .isLength({ max: 32 }).withMessage("price number so large"),
    check("priceAfterDiscount")
        .optional()
        .isNumeric().withMessage("product price after discount shold be a number type")
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error("the price after discount is larger than the normal price ")
            }
            return true
        }),
    check("colors")
        .optional()
        .isArray().withMessage("the avaliable color should be array of string"),
    check("imageCover")
        .notEmpty().withMessage("product imagecover is required"),
    check("images")
        .optional()
        .isArray().withMessage("images should be array of string"),
    check("category")
        .notEmpty().withMessage("product must belong to category")
        .isMongoId().withMessage("invalid category id"),
    check("subcategory")
        .optional()
        .notEmpty().withMessage("product must belong to subcategory")
        .isMongoId().withMessage("invalid subcategory id")
        .custom(async (value, { req }) => {
            const subcategoriesIds = (await subcategoryModel.find({ category: req.body.category })).map(ele => ele._id.toString())
            const checkIds = value.filter(id => !subcategoriesIds.includes(id))
            console.log("data", checkIds)
            if (checkIds.length > 0) {
                throw new Error(`those subcategories ${checkIds} doesn't belong to this category ${req.body.category}`)
            }
            return true
        })
    ,
    check("brand")
        .optional()
        .isMongoId().withMessage("invalid brand id"),
    check("ratingsAverage")
        .optional()
        .isNumeric().withMessage("rating average must be number type")
        .isLength({ min: 1, max: 5 }).withMessage("rating must be equal or above 1"),
    check("ratingQuantity")
        .optional()
        .isNumeric().withMessage("rating quantity must be number type")
    , validatorMiddleware

]

exports.getProductValidation = [
    check("id")
        .notEmpty().withMessage("product id is required")
        .isMongoId().withMessage("invalid product id"),
    validatorMiddleware
]