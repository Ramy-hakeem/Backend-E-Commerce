const express = require('express');
const { createSubcategory, getSubcategory, getAllSubcategories, updateSubcategory, deleteSubcategory } = require('../Services/SubcategoryServices');
const { createSubcategoryValidator, getSubcategoryValidation, updateSubcategoryValidation, deleteSubcategoryValidation } = require('../utils/validatorRules/subcategoryValidator');

// mergeParams allow us to access pramameters on other routers
// ex: we need to access categoryId from category route
const subcategroyRoute = express.Router({ mergeParams: true });

subcategroyRoute.route("/")
    .post(createSubcategoryValidator, createSubcategory)
    .get(getAllSubcategories)
subcategroyRoute.route("/:id")
    .get(getSubcategoryValidation, getSubcategory)
    .put(updateSubcategoryValidation, updateSubcategory)
    .delete(deleteSubcategoryValidation, deleteSubcategory)



module.exports = subcategroyRoute