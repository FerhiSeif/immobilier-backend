var mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Visite = require("../models/Visite");
router.post("/add", (req, res) => {
    //create doc(visite) from module(Visite)
    const visite = new Visite({
        nom: req.body.nom,
        tel: req.body.tel,
        nomAgent: req.body.nomAgent,
        email: req.body.email,
        date: req.body.date
    });

    visite
        .save()
        .then(visite => {
            res.send(visite);
        })
        .catch(err => {
            res.json(err);
        });
});


//************************
// etat {true or false} de la visite

router.get("/allFalse", function(req, res) {
    Visite.find({ etat: false }).exec(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.get("/allTrue", function(req, res) {
    Visite.find({ etat: true }),
        function(errr, result) {
            res.send(result);
        };
});
module.exports = router;