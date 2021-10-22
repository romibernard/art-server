// ./config/db.js
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/artempo-server", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Base de datos conectada")

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB