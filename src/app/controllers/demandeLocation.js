const DemandeLocation = require("../models/DemandeLocation");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


router.post("/add", authMiddleware, (req, res) => {

    var demandeLocation = new DemandeLocation({
        userId: req.user._id,
        idImmobilier: req.body.idImmobilier,
        idAgent: req.body.idAgent,
        region: req.body.region,
        surface: req.body.surface,
        prix: req.body.prix,
        categorie: req.body.categorie,

    });

    demandeLocation
        .save()
        .then(demandeLocation => {
            res.send(demandeLocation);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;