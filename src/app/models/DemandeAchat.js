const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const DemandeAchatSchema = new Schema({
    
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
        type:String
    }

    
});
// use schema to create mongooses module
module.exports = mongoose.model("DemandeAchat",DemandeAchatSchema);