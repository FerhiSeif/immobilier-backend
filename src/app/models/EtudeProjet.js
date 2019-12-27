const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const EtudeprojetSchema = new Schema({
    nom: {
        type: String,

    },
    prenom: {
        type: String,

    },
    tel: {
        type: String
    },
    email: {
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
    agentId: {
        type: String
    }

});
// use schema to create mongooses module
module.exports = mongoose.model("Etudeprojet", EtudeprojetSchema);