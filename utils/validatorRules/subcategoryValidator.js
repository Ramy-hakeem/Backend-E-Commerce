const { check, body } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");

exports.createSubcategoryValidator = [
    check("name")
        .notEmpty().withMessage("the subcategory name is required")
        .isLength({ min: 2 }).withMessage("the subcategory name is too short  enter name between 2 and 32 characters ")
        .isLength({ max: 32 }).withMessage("the subcategory name is too long  enter name between 2 and 32 characters "),
    check("categoryId")
        .notEmpty().withMessage("the category name is required")
        .isMongoId().withMessage("the category Id is not valid")
    , validatorMiddleware
]


exports.getSubcategoryValidation = [
    check("id")
        .notEmpty().withMessage("subcategory Id is required")
        .isMongoId().withMessage("invalid subcategory id"),
    validatorMiddleware
]


exports.updateSubcategoryValidation = [
    check("id")
        .notEmpty().withMessage("category Id is required")
        .isMongoId().withMessage("invalid subcategory Id"),
    check("categoryId").optional()
        .notEmpty().withMessage('Category ID cannot be empty if provided')
        .isMongoId().withMessage("invalid category Id"),
    check("name").optional()
        .notEmpty().withMessage(`subcategory name cannot be empty if provided`),
    body().custom((value, { req }) => {
        if (!req.body.name && !req.body.categoryId) {
            return false
        }
        return true
    }).withMessage(`To update, you must enter a new name or a new category ID, or both`),
    validatorMiddleware

]

exports.deleteSubcategoryValidation = [
    check("id").isMongoId().withMessage("invalid subcategory Id"),
    validatorMiddleware
]