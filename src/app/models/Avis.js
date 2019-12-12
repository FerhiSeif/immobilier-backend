const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const AvisSchema = new Schema({
    value: {
        type: String,
        required: true
    },

    avis: {
        type: String
    },
    

});
// use schema to create mongooses module
module.exports = mongoose.model("Avis", AvisSchema);