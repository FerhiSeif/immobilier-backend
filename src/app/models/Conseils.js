const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const ConseilSchema = new Schema({
    nom: {
        type: String
    },

    tel: {
        type: String
    },
    email: {

        type: String
    },
    agentId: {

        type: String
    },

    message: {

        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// use schema to create mongooses module
module.exports = mongoose.model("Conseil", ConseilSchema);