const express = require("express");
const router = express.Router(); // create Router
//const authMiddleware = require("../middleware/auth");
const NegocierPrix = require("../models/NegocierPrix");
// NegocierPrix APIs on Router
router.post("/add", (req, res) => {
    //create doc(NegocierPrix) from module(NegocierPrix)
    const negocierPrix = new NegocierPrix({
        // userId: req.user._id,
        nom: req.body.nom,
        tel: req.body.tel,
        email: req.body.email,
        prixPropose: req.body.message
    });

    negocierPrix
        .save()
        .then(negocierPrix => {
            res.send(negocierPrix);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/all", function(req, res) {
    NegocierPrix.find({})
        .then(negocierPrix => {
            res.send(negocierPrix);
        })
        .catch(err => {
            res.json(err);
        });
});
module.exports = router;