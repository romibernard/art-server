const mongoose = require("mongoose")

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        //required: true,
        trim: true,
        lowercase: true,
        //unique: true
    },
    email: {
        type: String,
        //required: true,
        unique: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        //required: true
    },
    role: {
        type: Number,
        default: 1
    }
})

const User = mongoose.model("User", UsersSchema)

module.exports = User