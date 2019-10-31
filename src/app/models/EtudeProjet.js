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
    required: true,
    type: String
  },

  titre: {
    required: true,
    type: String
  },
  localisation: {
    required: true,
    type: String
  },
  budget: {
    required: true,
    type: Number
  },
  description2: {
    required: true,
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// use schema to create mongooses module
module.exports = mongoose.model("Etudeprojet", EtudeprojetSchema);
