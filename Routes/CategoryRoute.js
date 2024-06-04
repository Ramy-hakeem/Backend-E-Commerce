const express = require("express");
const { getCategory, createCategory, getAllCategory, updateCategory, deleteCategory } = require("../Services/CategoryService");
const { getCategoryValidator, createCategoryvalidator, updateCategoryvalidator, deleteCategoryvalidator } = require("../utils/validatorRules/categoryValidator");
const subcategroyRoute = require("./SubcategoryRoute");

const CategoryRoute = express.Router();

// CategoryRoute.get(`/`, getAll,create)
CategoryRoute.route("/")
    .get(getAllCategory)
    .post(createCategoryvalidator, createCategory)

// CategoryRoute.get(`/:id`, get,create,delete)
CategoryRoute.route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryvalidator, updateCategory)
    .delete(deleteCategoryvalidator, deleteCategory)

CategoryRoute.use("/:categoryId/subcategories", subcategroyRoute)

module.exports = CategoryRoute



