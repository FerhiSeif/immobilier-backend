const DemandeAchat = require("../models/DemandeAchat");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

var nodemailer = require("nodemailer");
var emailModel = require("../models/Mail");
var smtpTransport = require("nodemailer-smtp-transport");

router.get("/demande-achat/:id", async (req, res) => {
  try {
    let response = await DemandeAchat.find({ agentId: req.params.id });

    res.send(response);
  } catch (err) {
    res.status(400).send("fetching demande achat failed" + err.message);
  }
});

router.post("/add", authMiddleware, (req, res) => {
  var demandeAchat = new DemandeAchat({
    userId: req.user._id,
    idImmobilier: req.body.idImmobilier,
    agentId: req.body.agentId,
    region: req.body.region,
    surface: req.body.surface,
    prix: req.body.prix,
    categorie: req.body.categorie,
    titre: req.body.titre,
    nom: req.body.nom,
    tel: req.body.tel,
    email: req.body.email
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
// get demande achat to edit
router.get("/selecteddemandeachat/:id", (req, res) => {
  DemandeAchat.findById(req.params.id, (err, data) => {
    if (err) res.status(400).send("fetching selected demande achat failed");
    res.send(data);
  });
});

// edit demande achat

router.put("/edit-demandeachat/:id", authMiddleware, async (req, res) => {
  DemandeAchat.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    (err, data) => {
      if (err) {
      res.status(400).send("editing selected demande failed" + err.message);}
     // console.log("data", { ...req.body });
      res.status(200).send(data);
    }
  );
});

//send email

router.post("/sendEmail", function(req, res) {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.googlemail.com",
      port: 465,
      auth: {
        user: "bienImmo2020@gmail.com",
        pass: "366795nounou"
      },
      secure: false,
      tls: { rejectUnauthorized: false },
      debug: true
    })
  );
 // console.log(DemandeAchat.message);
  const mailOptions = {
    from: "bienImmo2020@gmail.com",
    to: "bienImmo2020@gmail.com",
    subject: "demande Achat",
    html:
      "from : " +
      req.body.email +
      "<br>" +
      "nom : " +
      req.body.nom +
      "<br>" +
      "tel : " +
      req.body.tel +
      "<br>" +
      "Message : " +
      req.body.message +
      "<br>" +
      "Cordialement"
  };

  //sending the email
  //console.log("req.body");

  //console.log(req.body);
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
    //  console.log(err);
      res.send(err);
    } else {
    //  console.log("email envoye" + info);
      res.send(info);
    }
  });
});

  //demande Achat (confirme, attente, non confirme)
  router.get("/demandeAchat-statistique", function(req, res) {
    let stats={
        nonConfirme:0,
        confirme:0,
        enAttente:0,
        allDemAchat:0,
    }
    DemandeAchat.find()
        .then(demandeAchat => {
            (demandeAchat).forEach(element => {
                if(element.status==="confirme") stats.confirme+=1
                if(element.status==="non confirme") stats.nonConfirme+=1
                if(element.status==="en attente") stats.enAttente+=1
            });
            stats.allDemAchat=demandeAchat.length
            res.send(stats);
        })
        .catch(err => {
            //console.log(err);
            res.json(err);
        });
});
module.exports = router;
