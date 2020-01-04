const mongoose = require("mongoose");
const Schema = mongoose.Schema;
module.exports = Notification = mongoose.model(
    "Notification",
    new Schema({
        user: {
          type : String,
          },
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
            type: String
        },
        target: {
            type: String,
        }
    })
);