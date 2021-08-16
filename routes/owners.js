const express = require('express');
const router = express.Router();
const { Receipt, User } = require('../models');
const consts = require('../public/javascripts/consts');
const ownerData = require('../config/ownerData.json');

router.get('/', function (req, res, next) {
    // 유저의 객체를 받음
    user = req.body.user

    if(user.userCategory = consts.OWNER_CATEGORY){
        res.json({result:ownerData})
    }
    else{res.status(400).json({error:"점주가 아님"})}
  })

module.exports = router;