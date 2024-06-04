const expressAsyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");
const { json } = require("express");



// @desc    create new product 
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = expressAsyncHandler(
    async (req, res) => {
        req.body.slug = slugify(req.body.name)
        req.body.subcategory = Array.from(new Set(req.body.subcategory))
        console.log("data", req.body.subcategory)
        const product = await productModel.create(req.body)
        res.status(201).json(product)
    }
)

// @desc    get the all product with limit and current page
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = expressAsyncHandler(
    async (req, res) => {
        // filter 
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        let filteration = { ...req.query }
        const excludesFields = ["currentPage", "limit", "sort", "fields"]
        excludesFields.forEach(q => delete filteration[q])
        filteration = JSON.parse(JSON.stringify(filteration).replace(/gte|gt|lte|lt/ig, (s) => `$${s}`))


        // pagination
        const { limit = 15, currentPage = 1 } = req.query
        const skip = limit * (currentPage - 1)

        // building the query
        let mongooseQuery = productModel.find(filteration)
            .skip(skip).limit(limit)
            .populate([{ path: "category", select: "name -_id" }, { path: "brand", select: "name -_id" }, { path: "subcategory", select: "name -_id" }])

        // sorting

        if (req.query.sort) {
            mongooseQuery = mongooseQuery.sort(req.query.sort.split(",").join(" "))
        } else {
            mongooseQuery = mongooseQuery.sort("createdAt")
        }
        // field limit
        if (req.query.fields) {
            mongooseQuery = mongooseQuery.select(req.query.fields.split(",").join(" "))
        } else {
            mongooseQuery = mongooseQuery.select("-__v")
        }
        // execute the query
        const products = await mongooseQuery
        res.status(200).json({
            currentPage,
            limit,
            data: products
        })
    }
)


// @desc    get product by using id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const product = await productModel.findById(id)
            .populate([{ path: "category", select: "name -_id" }, { path: "brand", select: "name -_id" }, { path: "subcategory", select: "name -_id" }])
        res.status(200).json({ data: product })
    }
)

// @desc    delete product by using id 
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const product = await productModel.findByIdAndDelete(id)
        res.status(200).json({
            process: `the product ${product.name} deleted successfuly`,
            deletedProductData: product
        })
    }
)

// @desc    update product by using id
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        if (req.body.name) req.body.slug = slugify(req.body.name)

        const product = await productModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            process: `the product has been updated successfully`,
            updatedProductData: product
        })
    }
)