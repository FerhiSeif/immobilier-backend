const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MailSchema = new Schema({
  nom: {
    type: String,
    trim: true,
    required: true
  },

  tel: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    trim: true,
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
    agent:
        {type: mongoose.Schema.ObjectId,
            ref: "Agent"},

});
module.exports = mongoose.model("mails", MailSchema);
