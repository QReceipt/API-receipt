const express = require('express');
const router = express.Router();
const { Receipt, User, Menu, sequelize } = require('../models');
const consts = require('../public/javascripts/consts');
const Sequelize = require('sequelize');
var Op = Sequelize.Op
var andOp = Op.and

/* GET receipt listing. */
router.get('/', function (req, res, next) {
  // 유저의 객체를 받음
  // user = req.body.user
  user = req.body.data

  // pagination
  let pageNum = req.query.pageNum || 1;
  let pageSize = req.query.pageSize || 10;
  let offset = 0
  if (pageNum > 1) {
    offset = pageSize * (pageSize - 1);
  }

  // 날짜 조회
  today = new Date()
  let year = req.query.year?? today.getFullYear();
  let month = req.query.month?? today.getMonth()+1;
  let day = req.query.day?? today.getDate();

  let choiceDate = `${year}-${month}-${day}`
  // 전체조회할때는 id랑 영수증 번호?? 만? --> 프론트에 리스트일 경우 뭐로 뿌려야되는지 물어보기.
  Receipt.findAll({ 
    where: { 
      destinationPhoneNum: user.phoneNumber,
      andOp: sequelize.where(sequelize.fn('DATE',sequelize.col('orderDate')),choiceDate)
      }, 
    order: [['orderDate', 'DESC']], offset: offset, limit: pageSize,
    include:[
      {
        model:Menu, as:"Menus"
      }
    ]
  })
    .then(receipts => res.json({ results: receipts }))
    .catch(err => {
      console.log(err.message)
      res.status(500).json({error:err.message})
    })
})

router.get('/:id', function (req, res, next) {
  id = req.params.id
  Receipt.findOne({ where: { id: id },
    include:[
      {
        model:Menu, as:"Menus"
      }
    ]
   })
    .then(receipt => {
      res.json({ result: receipt })
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json({error:err.message})
    })
});

router.post('/', function (req, res, next) {
  // 셀러 정보 찾기 --> 가상프린터에서 정보를 어떻게 주냐에 따라 컬럼이름이 바뀜,, 컬럼이름은 내가 바꿔서 주면되고 데이터 타입이 문제일듯,
  // orderDate는 받을 때 /1000 해서 저장 줄때 *1000해서 주기 javascript 는 ms 단위.. 
  sellerPhone = req.body.sellerPhone;
  menu = req.body.menu;
  User.findOne({ attributes: ['id'], where: { phoneNumber: sellerPhone, userCategory: consts.OWNER_CATEGORY} })
    .then(seller => {
      if(seller) {
        req.body.seller = seller.id;
        delete req.body.sellerPhone; delete req.body.menu;
        Receipt.create(req.body)
          .then(result => {
            var menuData = menus.map((menu) => {menu["receipt"]=result.id; return menu})
            Menu.bulkCreate(menuData)
            .then(result=>res.json({ result: result }))
            .catch(err => {
              console.log(err.message)
              res.status(500).json({error:err.message})
            })
          })
          .catch(err => {
            console.log(err.message)
            res.status(500).json({error:err.message})
          })
      }
      else res.status(400).json({error:"점주 아님"})
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json({error:err.message})
    })
});

router.put('/:id', function (req, res, next) {
  Receipt.findOne({ where: { id: req.params.id } })
    .then(receipt => {
      if (receipt) {
        receipt.update(req.body)
          .then(updateReceipt => res.json({ result: updateReceipt }))
          .catch(err => {
            console.log(err.message)
            res.status(500).json({error:err.message})
          })
      }
      else res.status(400).json({ error: "Bad request" })
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json({error:err.message})
    })
});


module.exports = router;
