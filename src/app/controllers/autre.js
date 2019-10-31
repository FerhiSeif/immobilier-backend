const express = require("express");
const router = express.Router(); // create Router
//load user module
const Autre = require("../models/Autre");
// Autre APIs on Router
router.post("/add", (req, res) => {
  //create doc(autre) from module(autre)
  const autre = new Autre({
    nom: req.body.nom,
    nomAgent: req.body.nomAgent,
    email: req.body.email,
    description: req.body.description,
    titre: req.body.titre
  });

  autre
    .save()
    .then(autre => {
      res.send(autre);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
