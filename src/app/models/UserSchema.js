var mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const saltRounds = 10;

// const baseOptions = {
//   discriminatorKey: "itemtype", // our discriminator key, could be anything
//   collection: "Acteur" // the name of our collection
// };
Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    role: {
      type: String,
    enum: ["agent", "chefAgence", "client", "visiteur"]
      
      // required: true
    },
    activated: {
      type: Boolean
    },
    nom: {
      type: String,
      
      trim: true
    },
    prenom: {
      required: false,
      type: String
    },
    adress: {
      type: String
    },

    tel: {
      type: String
    },

    email: {
      
      type: String
    },

    motDePasse: {
      
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    mission: {
type: String
    },
    description: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    socialMedia: {
      type: Object
    },
     files: {

            type: Object
        },
    favoris: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BienImmobilier"
      }
    ],
    numbAnnonces :{
      type: Number,
      default: 0
    },
  })

UserSchema.pre("save", async function(next){
  let user = this
  if(user.isModified('motDePasse')){
    user.motDePasse = await bcrypt.hash(user.motDePasse,8)
    console.log('user')
  }
  next()
})



const User = mongoose.model("User", UserSchema);

module.exports = User
