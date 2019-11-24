const Estimation = require("../models/EstimationPrix");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const authMiddleware = require("../middleware/auth");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + "../../../../public/uploads");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});


var upload = multer({ storage: storage });
router.post("/add", upload.any(), (req, res) => {


    var fileinfo = req.files;
    var title = req.body.title;
    // console.log(title);
    console.log(' req.files ');
    console.log(req.files);

    var estimation = new Estimation({

        //userId: req.user._id,
        region: req.body.region,
        surface: req.body.surface,
        categorie: req.body.categorie,
        files: fileinfo,
        situation: req.body.situation

    });


    estimation
        .save()
        .then(estimation => {
            res.send(estimation);
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;