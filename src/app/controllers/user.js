const UserSchema = require("../models/UserSchema");
const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')
const Schema=mongoose.Schema;


router.get('/all', function(req,res) {
    UserSchema.find({}, function (err,result)
    {
        res.send(result)
    })
})
module.exports = router;
