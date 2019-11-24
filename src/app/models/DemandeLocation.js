const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const DemandeLocationSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "clients",

    },
    idImmobilier: {
        type: Schema.Types.ObjectId,
        ref: "immobiliers",

    },
    idAgent: {
        type: Schema.Types.ObjectId,
        ref: "agents",

    },
    categorie: {
        type: String
    },
    region: {
        type: String
    },
    surface: {
        type: String
    },
    prix: {
        type: String
    },
    nom: {
        type: String,
        trim: true,

    },

    tel: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true,

    },
    message: {
        type: String,


    },

});
// use schema to create mongooses module
module.exports = mongoose.model("DemandeLocation", DemandeLocationSchema);