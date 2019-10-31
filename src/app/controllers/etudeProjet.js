const express = require("express");
const router = express.Router(); // create Router
//load user module
const EtudeProjet = require("../models/EtudeProjet");
// EtudeProjet APIs on Router
router.post("/add", (req, res) => {
  //create doc(EtudeProjet) from module(EtudeProjet)
  const etudeProjet = new EtudeProjet({
    nom: req.body.nom,
    tel: req.body.tel,
    email: req.body.email,
    description: req.body.description,
    titre: req.body.titre,
    localisation: req.body.localisation,
    budget: req.body.budget,
    description2: req.body.description2
  });

  etudeProjet
    .save()
    .then(etudeProjet => {
      res.send(etudeProjet);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
