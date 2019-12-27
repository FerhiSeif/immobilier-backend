const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const EstimationSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    
    region: {
      type: String
      // required: true
    },
    surface: {
      type: Number
      // required: true
    },
 
 
    categorie: {
      type: String,
      value: [
        "Appartement",
        "Bureau",
        "LocalCommerciale",
        "Maison",
        "Terrain",
        "Residence",
        "Villa"
      ]
      // required: true
    },
  
    files: { 
     
      type: Object 
    },
    
    situation: {
      type: Boolean
    },
    date: {
      type: Date,
      default: Date.now
    },


});
// use schema to create mongooses module
module.exports = mongoose.model("Estimation", EstimationSchema);