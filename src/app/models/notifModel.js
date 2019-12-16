const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = Notification = mongoose.model(
  "Notification",
  new Schema({
    User: [Schema.Types.ObjectId],
    read: {
      type: Boolean,
      default: false
    },
    body: {
      type: String,
      required: true
    },
    object: {
      type: String
    },
    sender: {
      type: Schema.Types.ObjectId
    },
    target: {
      type: Schema.Types.ObjectId
    }
  })
);
