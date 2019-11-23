var express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
var emailModel = require("../models/Mail");
var smtpTransport = require("nodemailer-smtp-transport");

var email = function(Email) {};
var post = function(req, res) {
    var email = new Email(req.body);
    if (!req.body.message) {
        res.status(400);
        res.send("Message is required!");
    } else {
        email.save();
        res.status(201);
        res.send(email);
    }
};


// var get = function(req, res) {};
// const email = req.body.email;
router.get("/all", function(req, res) {
    emailModel.find({})
        .populate("agent")
        .exec(function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
});


router.post("/sendEmail", function(req, res) {
    var transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.googlemail.com",
            port: 465,
            auth: {
               user: "bienImmo2020@gmail.com",
                pass: "366795nounou",
               
            },
            secure: false,
            tls: { rejectUnauthorized: false },
            debug: true
        })
    );

    const mailOptions = {
        from: req.body.email, // sender address
        to: "bienImmo2020@gmail.com",
        //to: req.body.agent.email,
        subject: "date de rencontre ",
        html: req.body.message + "  <br> Cordialement "
    };

    //sending the email //

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("hii info" + info);
            res.send(info);
        }
    });
});

module.exports = router;