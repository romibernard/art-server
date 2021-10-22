const mongoose = require("mongoose")

const ObrasSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true
        //required: true
    },
    sizeH: {
        type: Number,
        //required: true
    },
    sizeW: {
        type: Number,
        //required: true
    },
    sizeP: {
        type: Number,
        //required: true
    },
    materials: {
        type: String,
        //required: true
    },
    picturesUrl: {
        type: String,
        //required: true
    },
    availableForSale: {
        type: Boolean,
        defautl: true,
    },
    price: {
        type: Number,
        //required: true
    },
    autor: {
        type: String
        //required: true
    },
    contact: {
        type: String,
        trim: true
        //required: true
    }
})

const Obra = mongoose.model("Obra", ObrasSchema)

module.exports = Obra