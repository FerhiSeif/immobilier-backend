const mongoose = require("mongoose");
const imagesUpload = require("images-upload-middleware");
const Schema = mongoose.Schema;

//create Schema

const BienImmobilierSchema = mongoose.model(
  "BienImmobilier",
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    titre: {
      type: String
      // required: true
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    adresse: {
      type: String
    },
    region: {
      type: String
      // required: true
    },
    surface: {
      type: Number
      // required: true
    },
    prix: {
      type: Number
      // required: true
    },
    nombreEtage: {
      type: Number
      // required: true
    },
    nombrePiece: {
      type: Number

      // required: true
    },
    nombreGarage: {
      type: Number

      // required: true
    },
    nombreSalon: {
      type: Number

      // required: true
    },
    nombreFacade: {
      type: Number
      // required: true
    },
    nombreSalleDeBain: {
      type: Number
    },

    statut: {
      type: String
      // required: true,
      // value: ["A louer", "A Vendre"]
    },
    description: {
      type: String
    },
    aLaUne: {
      type: Boolean,
      default: false
    },
    ValableAPartirDe: {
      type: Date
    },
    etat: {
      type: String,
      value: ["confirme", "en attente", "non confirme"],
      default: "non confirme"
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
    options: {
      type: Object

      // required: true
    },
    myoptions: {
      type: Array
    },
    files: {
      type: Object
    },

    situation: {
      type: Boolean,
      default: false
    },

    video: {
      type: String
    },
    nombreSalon: {
      type: String
    },
    lat: {
      type: String
    },
    lng: {
      type: String
    }
  })
);
module.exports = mongoose.model("BienImmobilier");
