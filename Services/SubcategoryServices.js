const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubcategoryModel = require("../models/subcategoryModel");

// @desc    create new subcategory that belong to main category
// @route   POST /api/v1/subcategory
// @access  Private
exports.createSubcategory = expressAsyncHandler(
    async (req, res) => {
        const { name, categoryId } = req.body;

        const subcategory = await SubcategoryModel.create({ name, slug: slugify(name), category: categoryId });
        res.status(201).json(subcategory);
    }
)


// @desc    get all subcategories
// @route    GET /api/v1/subcategory
// @access   Public
exports.getAllSubcategories = expressAsyncHandler(
    async (req, res) => {
        const { pageNumber = 1, limit = 5 } = req.query
        const skip = (pageNumber - 1) * limit
        const filtered = {}
        if (req.params.categoryId) filtered.category = req.params.categoryId
        const allSubcategories = await SubcategoryModel.find(filtered)
        const subcategories = await SubcategoryModel.find(filtered).skip(skip).limit(limit)
        res.status(200).json({
            Pages: Math.ceil(allSubcategories.length / limit),
            currentpage: +pageNumber,
            totalItems: allSubcategories.length,
            limit: +limit,
            data: subcategories
        })
    }
)


// @desc    get subcategory by Id
// @route   GET /api/v1/subcategory/:id  
// @access  Public
exports.getSubcategory = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const subcategory = await SubcategoryModel.findById(id)
        res.status(200).json({ "data": subcategory })
    }
)

// @desc    update subcategory name or category id or both 
// @route   UPDATE /api/v1/subcategoy/:id
// access   Private
exports.updateSubcategory = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const { name, categoryId } = req.body
        const updatedData = {}
        if (name) {
            updatedData.name = name
            updatedData.slug = slugify(name)
        }
        if (categoryId) {
            updatedData.categoryId = categoryId
        }

        const subcategory = await SubcategoryModel.findByIdAndUpdate({ _id: id }, updatedData, { new: true })


        res.status(200).json({ data: subcategory })

    }
)

// @desc    delete subcategory
// route    DELETE /api/v1/subcategory/:id
// access   Private 
exports.deleteSubcategory = expressAsyncHandler(
    async (req, res,) => {
        const { id } = req.params
        const subcategory = await SubcategoryModel.findByIdAndDelete(id)

        res.status(200).json({ "response": `the subcategory "${subcategory.name}" is deleted succfully ` })
    }
)

// @desc    get all subcategory that belong to specific main category
// @route   GET /api/v1/subcategory/:id   note the id is the category id
// access   public


// "/api/v1/category/:categoryId/subcatgory"
// when i used categoryRouter.use("/api/v1/category/:categoryId/subcatgory",subcategoryRouter)
// it means when i has the form of this route go direct to the suctegoryroute
// it means /api/v1/category/:categoryId/subcatgory change into /api/v1/subcategory/:categoryId/subcatgory
// and then we use mergeParams to merge with other rout
// "/api/v1/subcategory/"  - /api/v1/subcategory/:categoryId/subcatgory and both are get
// this equal /api/v1/subcategory/(1+:categoryId/subcatgory) this how it merge 



