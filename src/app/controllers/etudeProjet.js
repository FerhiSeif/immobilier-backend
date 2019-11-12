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
        region: req.body.region,
        budget: req.body.budget,
        description2: req.body.description2,
        statut: req.body.statut,
        nomAgent: req.body.nomAgent
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
router.get("/all", function(req, res) {
    EtudeProjet.find({})
        .then(etudeProjet => {
            res.send(etudeProjet);
        })
        .catch(err => {
            res.json(err);
        });
});
module.exports = router;