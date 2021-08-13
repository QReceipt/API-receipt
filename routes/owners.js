const express = require('express');
const router = express.Router();
const { Receipt, User } = require('../models')
const consts = require('../public/javascripts/consts')

router.get('/', function (req, res, next) {
    // 유저의 객체를 받음
    user = req.body.user

    // pagination
    let pageNum = req.query.pageNum || 1;
    let pageSize = req.query.pageSize || 10;
    let offset = 0
    if (pageNum > 1) {
        offset = pageSize * (pageSize - 1);
    }

    if(user.userCategory = consts.OWNER_CATEGORY){
        User.findOne({attributes: ['id'], where: { phoneNumber: user.phoneNumber }})
        .then(seller => {
            if(seller) 
            {
                Receipt.findAll({ where: { seller: seller }, order: [['orderDate', 'DESC']], offset: offset, limit: pageSize })
                .then(receipts => res.json({ results: receipts }))
                .catch(err => { res.status(400).json({ error: err.message }) })
            }
            else res.json(400).json({error:"점주가 아님"})
        })
        .catch(err => res.status(500))
    }
    else{res.status(400).json({error:"점주가 아님"})}
  })

module.exports = router;