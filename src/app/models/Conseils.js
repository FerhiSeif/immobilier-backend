const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const ConseilSchema = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },

    tel: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    nomAgent: {
        required: true,
        type: String
    },

    message: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// use schema to create mongooses module
module.exports = mongoose.model("Conseil", ConseilSchema);