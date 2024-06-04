const mongoose = require("mongoose")
require("colors")
const DBConnection = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI);
        const { readyState } = con.connection;

        switch (readyState) {
            case 0:
                console.log('The ready state is disconnected'.red.inverse);
                break;
            case 1:
                console.log('The ready state is connected'.blue);
                break;
            case 2:
                console.log('The ready state is connecting'.red.inverse);
                break;
            case 3:
                console.log('The ready state is disconnecting'.red.inverse);
                break;
            case 4:
                console.log('The ready state is unauthorized'.red.inverse);
                break;
            case 99:
                console.log('The ready state is uninitialized'.red.inverse);
                break;
            default:
                console.log('Unknown ready state'.red.inverse);
                break;
        }
    } catch (e) {
        console.log('Error connecting to the database:', e);
    }
};
module.exports = DBConnection