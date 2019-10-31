var mongoose = require("mongoose");
var Visite = require("../models/Visite");
const router = express.Router();

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
