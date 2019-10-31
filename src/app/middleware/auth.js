const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").replace("Bearer ", "");
    let decoder = await jwt.verify(token, "immobilier-app");

    let user = await User.findOne({
      _id: decoder._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("please to authenticate" + err);
  }
};

module.exports = auth;
