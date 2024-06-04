const express = require("express")
const { getAllBrands, createBrand, getBrand, deleteBrand, updateBrand } = require("../Services/brandServices")
const { createBrandValidation, getBrandValidation, deleteBrandValidation, updateBrandValidation } = require("../utils/validatorRules/brandValidation")

const brandRoute = express.Router()
brandRoute.route("/").get(getAllBrands).post(createBrandValidation, createBrand)

brandRoute.route("/:id").get(getBrandValidation, getBrand).delete(deleteBrandValidation, deleteBrand).put(updateBrandValidation, updateBrand)

module.exports = brandRoute; 