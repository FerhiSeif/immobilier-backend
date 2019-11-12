const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const EtudeprojetSchema = new Schema({
    nom: {
        type: String,
        required: true
    },

    tel: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    description: {

        type: String
    },

    titre: {

        type: String
    },
    region: {

        type: String
    },
    budget: {

        type: Number
    },
    description2: {

        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
     statut: {

        type: String
    },
    nomAgent:{
        type: String
    }

});
// use schema to create mongooses module
module.exports = mongoose.model("Etudeprojet", EtudeprojetSchema);
module.exports = mongoose.model("Etudeprojet", EtudeprojetSchema);