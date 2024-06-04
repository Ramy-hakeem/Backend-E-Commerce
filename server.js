const express = require(`express`);
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" })
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const GlobalError = require("./middlewares/ErrorMiddleware");

const DBConnection = require("./config/DB");
const CategoryRoute = require("./Routes/CategoryRoute");
const subcategroyRoute = require("./Routes/SubcategoryRoute");
const brandRoute = require("./Routes/brandRoute");
const productRoute = require("./Routes/productRoute");


// connect to DB
DBConnection()

// Express App
const app = express()

// Middlewares
app.use(express.json());
const { NODE_ENV } = process.env
if (NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Mount Route 
app.use("/api/v1/categories", CategoryRoute)
app.use("/api/v1/subcategories", subcategroyRoute)
app.use("/api/v1/brands", brandRoute)
app.use("/api/v1/products", productRoute)

// if the route not exist 
app.all("*", (req, res, next) => {
  // create the error and send it to global error handling 
  next(new ApiError(`can't find this route ${req.originalUrl}`, 400))
})
// Global Error Handling middleware 
app.use(GlobalError)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`server run on host ${PORT}`))


// handle errors outside the express
process.on("unhandledRejection", (error) => {
  console.error(`unhandleRejection error ${error.name} | ${error.message} `)
  server.close(() => {
    process.exit(1)
  })

})

