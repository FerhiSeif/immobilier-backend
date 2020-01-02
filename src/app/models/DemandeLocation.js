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
    agentId: {
        type: String

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
    status: {
        type: String,
        value: ["confirme", "en attente", "non confirme"],
        default: "non confirme"
    },
    message: {
        type: String,


    },

});
// use schema to create mongooses module
module.exports = mongoose.model("DemandeLocation", DemandeLocationSchema);