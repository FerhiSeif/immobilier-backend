const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const NegocierPrixSchema = new Schema({
    nom: {
        type: String,

    },

    tel: {
        type: String
    },
    email: {

        type: String
    },
    prixPropose: {

        type: String
    },

});
// use schema to create mongooses module
module.exports = mongoose.model("NegocierPrix", NegocierPrixSchema);