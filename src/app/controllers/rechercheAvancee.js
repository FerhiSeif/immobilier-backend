const express = require("express");
const router = express.Router();
const RechercheAvancee = require("../models/RechercheAvancee");

router.post("/add", (req, res) => {
  var rechercheAvancee = new RechercheAvancee({
    idUser: req.body.idUser,
    motCle: req.body.motCle,
    region: req.body.region,
    categories: req.body.categories,
    statut: req.body.statut,
    minLit: req.body.minLit,
    nombreSalleDeBain: req.body.nombreSalleDeBain,
    surfaceMin: req.body.surfaceMin,
    surfaceMax: req.body.surfaceMax,
    prix: req.body.prix
  });

  rechercheAvancee
    .save()
    .then(rechercheAvancee => {
      res.send(rechercheAvancee);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/all", function(req, res) {
  RechercheAvancee.find({})
    .then(rechercheAvancee => {
      res.send(rechercheAvancee);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
