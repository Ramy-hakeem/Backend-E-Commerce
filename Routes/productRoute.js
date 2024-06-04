const express = require("express");
const { createProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require("../Services/productServices");
const { createProdctValidation } = require("../utils/validatorRules/productValidation");

const productRoute = express.Router();

productRoute.route("/").post(createProdctValidation, createProduct).get(getAllProducts)

productRoute.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct)

module.exports = productRoute