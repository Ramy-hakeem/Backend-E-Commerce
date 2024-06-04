const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const brandsModel = require("../models/brandsModel");




// @desc    get all brand by sending the limit = brands per page and the current page
// @route   GET /api/v1/brands
// @access  Public
exports.getAllBrands = expressAsyncHandler(
    async (req, res) => {
        const { page = 1, limit = 5 } = req.query
        const skip = (page - 1) * limit
        const brands = await brandsModel.find({})
        const data = await brandsModel.find({}).skip(skip).limit(limit)
        res.status(200).json({
            pages: Math.ceil(brands.length / limit),
            currentPage: +page,
            allBrands: brands.length,
            limit: +limit,
            data
        })
    }
)


// @desc    create new brand 
// @route   POST /api/v1/brands
// @access  Private 
exports.createBrand = expressAsyncHandler(
    async (req, res) => {
        const { name } = req.body
        const brand = await brandsModel.create({ name, slug: slugify(name) })
        res.status(201).json(brand)
    }
)


// @desc    get specific brand by ID
// @route   GET /api/v1/brands/:id
// @access  Private
exports.getBrand = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const brand = await brandsModel.findById(id)
        res.status(200).json(brand)
    }
)

// @desc    delete specific brand with ID
// @route   DELETE /api/v1/brands/:id
// @access  Private 
exports.deleteBrand = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const brand = await brandsModel.findByIdAndDelete(id)
        res.status(200).json({ "result": `the ${brand.name} has been deleted succesfulty ` })
    }
)

// @desc    Update specific brand by Id
// @route   PUT /api/v1/brands/:id
// @acess   Private
exports.updateBrand = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const { name } = req.body
        const brand = await brandsModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).json(brand)
    }
)