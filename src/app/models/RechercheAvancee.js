const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const RechercheAvanceeSchema = mongoose.model(
  "RechercheAvancee",
  new Schema({
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    motCle: {
      type: String
    },

    region: {
      type: String,
      required: true
    },
    categories: {
      type: String,
      value: [
        "Appartement",
        "Bureau",
        "LocalCommerciale",
        "Maison",
        "Terrain",
        "Residence",
        "Villa"
      ],
      required: true
    },
    statut: {
      type: String,
      required: true,
      value: ["A louer", "A Vendre"]
    },
    minLit: {
      type: Number,
      required: true
    },
    nombreSalleDeBain: {
      type: Number
    },
    surfaceMin: {
      type: Number
    },
    surfaceMax: {
      type: Number
    },
    prix: {
      type: Number
    }
  })
);
module.exports = mongoose.model("RechercheAvancee");
