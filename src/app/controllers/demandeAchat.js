const DemandeAchat = require("../models/DemandeAchat");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


router.post("/add", authMiddleware, (req, res) => {

    var demandeAchat = new DemandeAchat({
        userId: req.user._id,
        idImmobilier: req.body.idImmobilier,
        idAgent: req.body.idAgent,
        region: req.body.region,
        surface: req.body.surface,
        prix: req.body.prix,
        categorie: req.body.categorie,

    });

    demandeAchat
        .save()
        .then(demandeAchat => {
            res.send(demandeAchat);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;