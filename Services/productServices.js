const expressAsyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");




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

        const documentCount = await productModel.countDocuments();
        // building the query
        const apiFeatures = new ApiFeatures(productModel.find(), req.query)
            .paginate()
            .filter()
            .search()
            .limitFieldes()
            .sort()
        // .populate([{ path: "category", select: "name -_id" }, { path: "brand", select: "name -_id" }, { path: "subcategory", select: "name -_id" }])

        // execute the query
        const { mongooseQuery, pagination } = apiFeatures

        const products = await mongooseQuery
        res.status(200).json({
            result: products.length,
            pagination,
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