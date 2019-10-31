const express = require("express");
const router = express.Router(); // create Router
//load user module
const Conseil = require("../models/Conseils");
// conseils APIs on Router
router.post("/addconseils", (req, res) => {
  //create doc(conseil) from module(Conseil)
  const conseil = new Conseil({
    nom: req.body.nom,
    tel: req.body.tel,
    nomAgent: req.body.nomAgent,
    email: req.body.email,
    message: req.body.message
  });

  conseil
    .save()
    .then(conseil => {
      res.send(conseil);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/all", function(req, res) {
  Conseil.find({})
    .then(conseil => {
      res.send(conseil);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
