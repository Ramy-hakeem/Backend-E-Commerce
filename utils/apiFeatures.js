class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    filter() {
        let filteration = { ...this.queryString }
        const excludesFields = ["page", "limit", "sort", "fields", "keyword"]
        excludesFields.forEach(q => delete filteration[q])
        filteration = JSON.parse(JSON.stringify(filteration).replace(/gte|gt|lte|lt/ig, (s) => `$${s}`))
        this.mongooseQuery = this.mongooseQuery.find(filteration)
        return this
    }

    sort() {
        if (this.queryString.sort) {
            this.mongooseQuery = this.mongooseQuery.sort(this.queryString.sort.split(",").join(" "))
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("createdAt")
        }
        return this
    }

    limitFieldes() {
        if (this.queryString.fields) {
            this.mongooseQuery = this.mongooseQuery.select(this.queryString.fields.split(",").join(" "))
        } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v")
        }
        return this
    }

    search() {
        if (this.queryString.keyword) {
            const query = {}
            query.$or = [
                { title: { $regex: this.queryString.keyword, $options: "i" } },
                { description: { $regex: this.queryString.keyword, $options: "i" } }
            ]

            this.mongooseQuery = this.mongooseQuery.find(query)
        }
        return this
    }

    paginate(documentCount) {
        const page = + this.queryString.page || 1
        const limit = +this.queryString.limit || 10
        const skip = limit * (page - 1)
        const pagination = {}
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(documentCount / limit)
        pagination.numberOfElement = documentCount
        this.pagination = pagination
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
        return this
    }
}

module.exports = ApiFeatures