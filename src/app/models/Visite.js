const mongoose = require("mongoose");
const schema = mongoose.schema;
const VisiteSchema = new Schema({
    idClient: {
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
    nom: {
        type: String,
        
    },
     email: {
        type: String,
        
    },
     tel: {
        type: String,
        
    },
    date: {
        type: Date,
        
    },
    etat: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("visites", VisiteSchema);