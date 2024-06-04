const { check, body } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const brandsModel = require("../../models/brandsModel");

exports.createBrandValidation = [
    check("name")
        .notEmpty().withMessage("brand name is required  let it be between 2 and 32 characters")
        .isLength({ min: 2, max: 32 }).withMessage("The brand name must be between 2 and 32 characters")
    , body('name').custom(async (value, { req }) => {
        const brand = await brandsModel.findOne({ name: value });
        if (brand) {
            throw new Error(`This name '${value}' already exists`);
        }
        return true;
    })

    ,
    validatorMiddleware
]

exports.getBrandValidation = [
    check("id")
        .isMongoId().withMessage("invalid brand id format"),
    validatorMiddleware
]

exports.deleteBrandValidation = [
    check("id")
        .isMongoId().withMessage("invalid brand id format"),
    validatorMiddleware
]

exports.updateBrandValidation = [
    check("id")
        .isMongoId().withMessage("invalid Id formate"),
    check("name")
        .notEmpty().withMessage("the name is required")
        .isLength({ min: 2, max: 32 }).withMessage("The brand name must be between 2 and 32 characters"),
    body("name").custom(async (value, { req }) => {
        const brand = await brandsModel.findOne({ name: value })
        if (brand) {
            throw new Error(`the brand name '${value}' is already exist `);
        }
    }),
    validatorMiddleware
]



