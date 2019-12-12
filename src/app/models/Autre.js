const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const AutreSchema = new Schema({
    nom: {
        type: String,
      
    },
    email: {
       
        type: String
    },
    agentId: {
        type: String
    },
    titre: {
      
        type: String
    },
    description: {

        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// use schema to create mongooses module
module.exports = mongoose.model("Autre", AutreSchema);