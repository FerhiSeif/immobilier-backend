const ReclamtionModel = require("../models/Reclamation");
const express = require("express");
const router = express.Router();

router.post("/addReclamation", function(req, res) {
  var Reclamation = new ReclamtionModel({
    titre: req.body.titre,
    nom: req.body.nom,
    email: req.body.email,
    description_rec: req.body.description_rec,
    date_rec: req.body.date_rec
  });

  Reclamation.save(function(err) {
    if (err) {
      res.send({ State: "Not Ok", msg: "error" + err });
    } else {
      res.send({ State: "Okay", msg: "Reclamtion added" + Reclamation });
    }
  });
});

router.get("/all", function(req, res) {
  ReclamtionModel.find({})
    .populate("clients", "nom", "prenom")
    .exec(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});
router.delete("/remove/:id", function(req, res) {
  ReclamtionModel.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      res.send({ state: "not ok", msg: "err" + err });
    } else {
      res.send({ state: "ok", msg: "supp" });
    }
  });
});
//prolongation
router.put("/update/:id", function(req, res) {
  ReclamtionModel.updateOne(
    {
      id: req.params.id,
      titre: req.body.titre,
      description_rec: req.body.description_rec,
      date_rec: req.body.date_rec
    },
    function(err) {
      if (err) res.send({ sate: "not ok", msg: "error:" + err });
      else res.send({ sate: "ok", msg: "Reclamation updated" });
    }
  );
});
module.exports = router;
