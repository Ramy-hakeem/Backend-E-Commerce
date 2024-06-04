// to access env i have to install npm i dotenv
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

// to acess the database
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URI).then((con) => console.log(`result : ${con.connection.host}`)).catch((e) => console.log(e))


// to deal with DB
app.use(express.json()); // because the date comes in string type so we need to change it to Json

// Create Schema
const categorySchema = new mongoose.Schema({
    name: String,
})

// Create Model
const CategoryModel = mongoose.model(`Category`, categorySchema)

