const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
    check("id")
        .isMongoId().withMessage("invalid category id foramt"),
    validatorMiddleware
]
exports.updateCategoryvalidator = [
    check("id")
        .isMongoId().withMessage("invalid category id foramt"),
    validatorMiddleware
]
exports.deleteCategoryvalidator = [
    check("id")
        .isMongoId().withMessage("invalid category id foramt"),
    validatorMiddleware
]
exports.createCategoryvalidator = [
    check("name")
        .notEmpty().withMessage("category name is required")
        .isLength({ min: 3 }).withMessage("too short category name  let it be between 3 to 32 characters")
        .isLength({ max: 32 }).withMessage("too long category name  let it be between 3 to 32 characters")
    ,
    validatorMiddleware
]