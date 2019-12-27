const express = require("express");
const router = express.Router(); // create Router
//load user module
const Autre = require("../models/Autre");
const authMiddleware = require("../middleware/auth");

// Autre APIs on Router
router.post("/add", (req, res) => {
    //create doc(autre) from module(autre)
    const autre = new Autre({
        nom: req.body.nom,
        agentId: req.body.agentId,
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
router.get("/autreServices/:id", (req, res) => {
    Autre.findById(req.params.id, (err, data) => {
        if (err) res.status(400).send("fetching selected autres services failed");
        res.send(data);
    });
});
router.get("/all", function(req, res) {
    Autre.find({})
        .then(autre => {
            res.send(autre);
        })
        .catch(err => {
            res.json(err);
        });
});

router.delete("/remove/:id", authMiddleware, function(req, res) {
    Autre.deleteOne({ _id: req.params.id, userId: req.user._id },
        function(err) {
            if (err) {
                res.status(400).send({ state: "not ok", msg: "err" + err });
            } else {
                res.status(200).send({ state: "ok", msg: "supp" });
            }
        }
    );
});
module.exports = router;