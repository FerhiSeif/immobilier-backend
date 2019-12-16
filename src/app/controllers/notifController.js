const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const User = require("../models/UserSchema");
const _ = require("underscore");

//to add notif
router.post("/addnotification", async function(req, res) {
  let userFetch = null;

  userFetch = await User.find({ role: { $ne: "agent" } });

  const newNotif = new Notification({
    users: userFetch,
    object: req.body.object,
    body: req.body.body,
    sender: req.body.sender,
    target: req.body.target,
    read: false
  });
  await newNotif.save().then(notification => {
    res.json(notification);
    console.log(notification);
  });
});

//get notification not readed
router.post("/getnotifnotread", function(req, res) {
  const errors = {};

  Notification.find({ users: req.body.user_Id, read: "false" })
    .then(notification => {
      if (!notification) {
        errors.notification = "There is no notification not read for this user";
        return res.status(404).json(errors);
      }
      res.status(200).json(notification);
    })
    .catch(err => res.status(404).json(errors));
});

////get all notif
router.post("/getnotification", async function(req, res) {
  const errors = {};
  let nombreNotif = 0;
  await Notification.find({ users: { $in: [req.body.user_Id] } })
    .then(notification => {
      if (_.isEmpty(notification)) {
        // let notifread = count (notification.read == false)
        errors.noNotification =
          "Il n y a pas de notification pour cet utilisateur";
        return res.status(404).json(errors);
      }
      notification.map(notif => {
        console.log(notif.read);
        console.log(nombreNotif);
        if (notif.read === false) {
          nombreNotif += 1;
        }
      });
      res
        .status(200)
        .json({ notification: notification, nombreNotif: nombreNotif });
    })
    .catch(err => res.status(404).json({ err: err }));
}),
  //put notif
  router.put("/createnotif", async function(req, res) {
    let userFetch = null;
    if (req.body.role === "agent") {
      userFetch = await User.find({ role: "agent" });
    } else if (req.body.role === "client") {
      userFetclient = await User.find({ role: "client" });
    } else {
      userFetch = req.body.role;
    }

    const newNotif = new Notification({
      users: userFetch,
      object: req.body.object,
      body: req.body.body,
      sender: req.body.sender,
      target: req.body.target,
      read: false
    });
    await newNotif.save().then(notification => {
      res.json(notification);
      console.log(notification);
    });
  });

//////

////

// a chaque fois on doit rempli notification qu'on l'appel
router.put("/readnotification", function(req, res) {
  Notification.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { read: true } }
  ).then(resp => res.status(200).json({ notif: "readed" }));
  console.log("read");
});

// // notifResponse: async (req, res) => {}

module.exports = router;
