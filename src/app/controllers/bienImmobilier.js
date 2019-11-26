const BienImmobilier = require("../models/BienImmobilier");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/UserSchema");

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
router.post("/add", upload.any(), authMiddleware, async (req, res) => {
  var fileinfo = req.files;
  var title = req.body.title;
  // console.log(title);
  console.log(" req.files ");
  console.log(req.files);

  let currentUser = await User.findOne({ _id: req.user._id });
  let userRole = currentUser.role;

  var bienImmobilier = new BienImmobilier({
    //  ...req.body,
    userId: req.user._id,
    agentId: userRole === "agent" ? req.user._id : req.body.agentId,
    titre: req.body.titre,
    region: req.body.region,
    surface: req.body.surface,
    prix: req.body.prix,
    nombreEtage: req.body.nombreEtage,
    nombrePiece: req.body.nombrePiece,
    nombreFacade: req.body.nombreFacade,
    nombreSalleDeBain: req.body.nombreSalleDeBain,
    statut: req.body.statut,
    description: req.body.description,
    ALaUne: req.body.ALaUne,
    ValableAPartirDe: req.body.ValableAPartirDe,
    etat: req.body.etat,
    categorie: req.body.categorie,
    options: req.body.options,
    myoptions: req.body.myoptions,
    files: fileinfo,
    situation: req.body.situation,
    video: req.body.video,
    nombreSalon: req.body.nombreSalon,
    lat: req.body.lat,
    lng: req.body.lng
  });

  bienImmobilier
    .save()
    .then(bienImmobilier => {
      res.send(bienImmobilier);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/all", function(req, res) {
  let queries = handlingQueries(req.query);
  console.log(queries);
  BienImmobilier.find({ ...queries, situation: true })
    .then(bienImmobilier => {
      res.send(bienImmobilier);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

//***********Annonces de l'agent*******************
router.get("/agent/all", authMiddleware, (req, res) => {
  BienImmobilier.find({ agentId: req.user._id }, (err, data) => {
    if (err) res.status(400).send("fetching my annoncements list failed");
    res.send(data);
  });
});

//***************************************************

router.delete("/remove/:id", authMiddleware, function(req, res) {
  BienImmobilier.deleteOne(
    { _id: req.params.id, userId: req.user._id },
    function(err) {
      if (err) {
        res.status(400).send({ state: "not ok", msg: "err" + err });
      } else {
        res.status(200).send({ state: "ok", msg: "supp" });
      }
    }
  );
});

// prolongation
router.put("/update/:id", function(req, res) {
  BienImmobilier.updateOne({ _id: req.params.id }, req.body, function(err) {
    if (err) {
      res.send({ state: "not ok", msg: "err updated" + err });
    } else {
      res.send({ state: "ok", msg: "updated ok" });
    }
  });
});

router.get("/selectedAnnonce/:id", (req, res) => {
  BienImmobilier.findById(req.params.id, (err, data) => {
    if (err) res.status(400).send("fetching selected annoncement failed");
    res.send(data);
  });
});

router.get("/mes-annonces", authMiddleware, (req, res) => {
  BienImmobilier.find({ userId: req.user._id }, (err, data) => {
    if (err) res.status(400).send("fetching my annoncements list failed");
    res.send(data);
  });
});

router.put("/update-selected-annoncement/:id", authMiddleware, (req, res) => {
  if (req.user.role === "agent") {
    BienImmobilier.findOneAndUpdate(
      { _id: req.params.id, agentId: req.user._id },
      { ...req.body },
      (err, data) => {
        if (err)
          res
            .status(400)
            .send("editing selected annoncement failed" + err.message);
        res.status(200).send(data);
      }
    );
  } else {
    BienImmobilier.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { ...req.body, situation: false },
      (err, data) => {
        if (err)
          res
            .status(400)
            .send("editing selected annoncement failed" + err.message);
        res.status(200).send(data);
      }
    );
  }
});

module.exports = router;

let handlingQueries = queries => {
  let query = {};
  if (queries.statut) {
    query.statut = queries.statut;
  }
  if (queries.region) {
    query.region = queries.region;
  }
  if (queries.categorie) {
    query.categorie = queries.categorie;
  }

  if (queries.nombreChambre) {
    if (queries.nombreChambre !== 3) {
      query.nombrePiece = queries.nombreChambre;
    } else {
      query.nombrePiece = { $gt: 2 };
    }
  }
  if (queries.nombreSalon) {
    if (queries.nombreSalon !== 3) {
      query.nombreSalon = queries.nombreSalon;
    } else {
      query.nombreSalon = { $gt: 2 };
    }
  }
  if (queries.nombreGarage) {
    if (queries.nombreGarage !== 3) {
      query.nombreGarage = queries.nombreGarage;
    } else {
      query.nombreGarage = { $gt: 2 };
    }
  }
  if (queries.nombreSalleDeBain) {
    if (queries.nombreSalleDeBain !== 3) {
      query.nombreSalleDeBain = queries.nombreSalleDeBain;
    } else {
      query.nombreSalleDeBain = { $gt: 2 };
    }
  }
  if (queries.surface) {
    if (queries.surface === "Inférieur à 100M2") {
      query.surface = { $lt: 101 };
    }
    if (queries.surface === "Entre 100 et 200 M2") {
      query.surface = { $lt: 201, $gt: 100 };
    }
    if (queries.surface === "Entre 200 et 300 M2") {
      query.surface = { $lt: 301, $gt: 200 };
    }
    if (queries.surface === "Entre 300 et 400 M2") {
      query.surface = { $lt: 401, $gt: 300 };
    }
    if (queries.surface === "Supéreieur à 400 M2") {
      query.surface = { $gt: 400 };
    }
  }
  if (queries.prixMax && queries.prixMin) {
    query.prix = { $gt: queries.prixMin, $lt: queries.prixMax };
  }
  if (queries.prixMax && !queries.prixMin) {
    query.prix = { $lt: queries.prixMax };
  }
  if (!queries.prixMax && queries.prixMin) {
    query.prix = { $gt: queries.prixMin };
  }
  if (queries.titre) {
    query.titre = { $regex: queries.titre, $options: "i" };
  }

  return query;
};
