const express = require('express');
const router = express.Router();
const { Receipt, User } = require('../models')

OWNER_CATEGORY = 2

router.get('/', function (req, res, next) {
    // 유저의 객체를 받음
    user = req.body.user
  
    if(user.userCategory = OWNER_CATEGORY){
        Receipt.findAll({ where: { destinationPhoneNum: user.phoneNumber }, order: [['orderDate', 'DESC']], offset: offset, limit: pageSize })
        .then(receipts => res.json({ results: receipts }))
        .catch(err => { res.status(400).json({ error: err.message }) })
    }
    else{res.status(400).json({error:"점주가 아님"})}
  })