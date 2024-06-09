const expressAsyncHandler = require("express-async-handler")

const CategoryModel = require(`../models/CategoryModel`)
const slugify = require("slugify");
const ApiError = require("../utils/apiError");



// @desc    create Category
// @route   POST /api/v1/category
// @access   Private 
exports.createCategory = expressAsyncHandler(
    async (req, res) => {
        const { name } = req.body;

        const category = await CategoryModel.create({ name, slug: slugify(name) })
        res.status(201).json({ data: category })
    }
)


// @desc    get all category
// @route   GET /api/v1/category?page=2&limit=3
// @access   public
exports.getAllCategory = expressAsyncHandler(
    async (req, res) => {
        const { page = 1, limit = 3 } = req.body;
        const skip = (page - 1) * limit
        const allCategories = await CategoryModel.find({})
        const Categories = await CategoryModel.find({}).skip(skip).limit(limit)
        res.status(200).json({
            pages: Math.ceil(allCategories.length / limit),
            limit,
            totalNumberOfCategories: allCategories.length,
            currentPage: page,
            results: Categories.length,
            data: Categories
        })
    }
)

// @desc     get spacific category
// @route    GET /api/v1/category/id
// @access    Public
exports.getCategory = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);

        if (!category) {
            return next(new ApiError(`can't find this category`, 404))
        };
        res.status(200).json(category);
    }
)

// @desc    update exist category 
// @rou53   PUT /api/v1/category/:id
// @access  Private 

exports.updateCategory = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const { name } = req.body
        const category = await CategoryModel.findOneAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true })
        if (!category) {
            // return next(new ApiError(`can't find this category`, 404))
        }
        res.status(200).json({ date: category });
    }
)


// @desc    delete category 
// @route   DELETE /api/v1/category/:id
// @access  PRIVATE
exports.deleteCategory = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
            return next(new ApiError(`can't find this category`, 404))
        }
        res.status(200).json({ "result": "the category has been deleted" });
    }
);






