const fs = require("fs")
const dotenv = require("dotenv")
const productModel = require("../../models/productModel");
const DBConnection = require("../../config/DB");


dotenv.config({ path: `../../config.env` })
// connect to data base 
DBConnection()

const products = JSON.parse(fs.readFileSync(`./product.json`))

const insertData = async () => {
    try {
        await productModel.create(products)
        console.log(`DataInserted`.green.inverse)
    } catch (e) {
        console.log(e)
    }
}
const destroyData = async () => {
    try {
        await productModel.deleteMany();
        console.log(`Data Destroyed`.red.inverse)
        process.exit(1)
    } catch (e) {
        console.log(e)
    }

}

if (process.argv[2] === "-i") {
    insertData()
} else if (process.argv[2] === "-d") {
    destroyData()
}

