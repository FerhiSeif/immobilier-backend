const express = require("express");
const router = express.Router(); // create Router
//load user module
const Avis = require("../models/Avis");
// Avis APIs on Router
router.post("/addavis", (req, res) => {
    //create doc(Avis) from module(Avis)
    const avis = new Avis({
        value: req.body.value,
        avis: req.body.avis,
        
    });

    avis
        .save()
        .then(avis => {
            res.send(avis);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/all", function(req, res) {
    Avis.find({})
        .then(avis => {
            res.send(avis);
        })
        .catch(err => {
            res.json(err);
        });
});
module.exports = router;