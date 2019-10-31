const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Schema
const AutreSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    required: true,
    type: String
  },
  nomAgent: {
    type: String,
    required: true
  },
  titre: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// use schema to create mongooses module
module.exports = mongoose.model("Autre", AutreSchema);
