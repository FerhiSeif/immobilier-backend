const express = require("express");
const router = express.Router();
//load user module
const User = require("../models/UserSchema");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../../server");
const passport = require("passport");
const _ = require("lodash");

//init var for forgot password
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
//

const authMiddleware = require("../middleware/auth");

//load Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//@Route GET api/users/test
//@desc tests user route
//@acces Public
router.get("/test", (req, res) => res.json({ msg: "Users work" }));

//@Route Post api/users/register
//@desc Register user
//@acces Public

//***************************************************
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        adress: req.body.adress,
        email: req.body.email,
        role: req.body.role,
        motDePasse: req.body.motDePasse,
        motDePasse2: req.body.motDePasse2,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.motDePasse, salt, (err, hash) => {
          if (err) throw err;
          newUser.motDePasse = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(400).json(err.message));
        });
      });
    }
  });
});
//***************************************************

//@Route POST api/users/login
//@desc login user returning JWT Token
//@acces Public

//***************************************************
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const motDePasse = req.body.motDePasse;
  //find user by email
  User.findOne({ email }).then(async user => {
    //check for user
    if (!user) {
      errors.email = "User not Found";
      return res.status(400).json(errors);
    }

    //check password
    else if (bcrypt.compare(motDePasse, user.motDePasse)) {
      // user matched
      const payload = { id: user.id,  role:user.role }; //create jwt payload
      //sign Token

      let token = await jwt.sign(payload, "immobilier-app");

      user.tokens = user.tokens.concat({ token });
      await user.save();

      res.send({
        status: "succes",
        msg: "user found",
        user: _.pick(user, [
          "_id",
          "nom",
          "tel",
          "adress",
          "email",
          "role",
          "date",
          "description",
          "socialMedia",
          "favoris"
        ]),
        token: token
      });
    } else {
      errors.motDePasse = "motDePasse incorrect";
      return res.status(400).json(errors);
    }
  });
});

router.put("/deactivateUser", (req, res) => {
  User.findByIdAndUpdate(
    req.body.userId,

    {
      activated: false
    }
  )
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(400).json(err));
}),
  router.put("/activateUser", async (req, res) => {
    await User.findByIdAndUpdate(req.body.userId, {
      $set: { activated: true }
    })
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(400).json(err));
  }),
  //***************************************************
  //@Route GET api/users/current
  //@desc return current user
  //@acces Private

  //sal7tha
  //initializes the passport configuration.
  require("../../../passport")(passport);
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  }
);

//***************************************************
router.get("/all", function(req, res) {
  User.find({})
    .populate("role", "nom")
    .populate("reclamation")
    .exec(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: "succes",
          msg: "All Clients",
          data: { result: result }
        });
      }
    });
});
//*********************GET ALL AGENTS*********************
router.get("/agents/all", function(req, res) {
  User.find({ role: "agent" })
    // .populate("role", "nom")
    // .populate("reclamation")
    .exec(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: "succes",
          msg: "All agents",
          data: { result: result }
        });
      }
    });
});

//***************************************************
// router.get('/logout', function(req, res){
//     var name = req.user.nom;
//     console.log("LOGGIN OUT " + req.user.nom)
//     req.logout();
//     res.redirect('/');
//     req.session.notice = "You have successfully been logged out " + name + "!";
// });

//***************************************************

//********************FORGOT PASSWORD****************//
router.get("/forgot", function(req, res) {
  res.render("forgot");
});

router.post("/forgot", function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            res.send("error", "no account with that email address exist");
            return res.redirect("/forgot");
          }

          (user.resetPasswordToken = token),
            (user.resetPasswordExpires = Date.now() + 3600000); // 1 heure

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "learntoCodeinfo@gmail.com",
            pass: process.env.GMAILPW
          }
        });
        var mailOptions = {
          to: user.email,
          from: "AgenceImmobilier@gmail.com",
          subject: "Node js Password reset",
          text:
            "Your are recieving this because you (or someone else) have requested the reset of the password" +
            "Please click on the following link or paste this into your browser  to complete the process" +
            "http://" +
            req.headers.host +
            "/reset" +
            token +
            "\n\n" +
            "if you did not request this, please ignore this email and your password will remain ungchanged"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log("mail sent");
          res.json({
            success: true,
            message:
              "an email has been sent to " +
              user.email +
              "with further instructions."
          });
          done(err, "done");
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
});

router.post("/reset/:token", function(req, res) {
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            resetPassswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          function(err, user) {
            if (!user) {
              res.send(
                "erreur : Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }
            if (req.body.password == req.body.confirm) {
              user.setPassword(req.body.password, function(err) {
                user.resetPasswordExpires = undefined;
                user.resetPasswordToken = undefined;

                user.save(function(err) {
                  req.logIn(user, function(err) {
                    done(err, user);
                  });
                });
              });
            } else {
              res.send("erreur : Password do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "learntoCodeinfo@gmail.com",
            pass: process.env.GMAILPW
          }
        });
        var mailOptions = {
          to: user.email,
          from: "Agence Immobilier website",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            "has just changed ."
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          res.json({
            success: true,
            msg: "Success ! Your password has been changed ."
          });
          done(err);
        });
      }
    ],
    function(err) {
      // res.redirect('/home')
      res.send("go  to home");
    }
  );
});

//tres important hathi ntasti biha si auth ynajm ya3ml tache sinon le
// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.error = "Please sign in!";
  res.redirect("/login");
}

router.get("/profile", authMiddleware, (req, res) => {
  let response = _.pick(req.user, [
    "_id",
    "nom",
    "tel",
    "adress",
    "email",
    "date",
    "description",
    "socialMedia",
    "favoris"
  ]);

  res.send(response);
});

router.post("/update-profile", authMiddleware, async (req, res) => {
  let user = await User.findByIdAndUpdate(req.user._id, { ...req.body });
  res.send(user);
});

router.put("/logout", authMiddleware, (req, res) => {
  let user = req.user;
  let token = req.token;

  user.tokens = user.tokens.filter(el => el.token !== token);

  user.save(err => {
    if (err) res.status(400).send("user log out failed");
    else res.send("user logout successufily");
  });
});

router.put("/add-favorite", authMiddleware, (req, res) => {
  let user = req.user;
  user.favoris = user.favoris.concat(req.body.annoncementId);

  user.save(err => {
    if (err) res.status(400).send("add annoncement to favorites failed");
    else res.send("Annoncement added to user favorites");
  });
});

router.get("/favorites", authMiddleware, async (req, res) => {
  let favorites = await User.findById(req.user._id).populate("favoris");
  favorites = _.pick(favorites, ["favoris"]);
  favorites = favorites.favoris;
  if (!favorites) res.status(400).send("get user favorites failed");
  else res.status(200).send(favorites);
});

router.put("/delete-favorite", authMiddleware, (req, res) => {
  let user = req.user;
  console.log(req.body.annoncementId);
  user.favoris = user.favoris.filter(el => el != req.body.annoncementId);

  user.save(err => {
    if (err) res.status(400).send("add annoncement to favorites failed");
    else res.send("Annoncement added to user favorites");
  });
});

module.exports = router;
