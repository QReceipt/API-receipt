const express = require('express');
const router = express.Router();
const { Receipt, User } = require('../models')

/* GET users listing. */
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

  Receipt.findAll({ where: { destinationPhoneNum: user.phoneNumber }, order: [['orderDate', 'DESC']], offset: offset, limit: pageSize })
    .then(receipts => res.json({ results: receipts }))
    .catch(err => { res.status(400).json({ error: err.message }) })
})

router.get('/:id', function (req, res, next) {
  id = req.params.id
  Receipt.findOne({ where: { id: id } })
    .then(receipt => res.json({ result: receipt }))
    .catch(err => { res.status(400).json({ error: err.message }) })
});

router.post('/', function (req, res, next) {
  // 셀러 정보 찾기 --> 가상프린터에서 정보를 어떻게 주냐에 따라 컬럼이름이 바뀜,, 컬럼이름은 내가 바꿔서 주면되고 데이터 타입이 문제일듯,
  // orderDate는 받을 때 /1000 해서 저장 줄때 *1000해서 주기 javascript 는 ms 단위.. 
  sellerPhone = req.body.sellerPhone
  User.findOne({ attributes: ['id'], where: { phoneNumber: sellerPhone } })
    .then(seller => {
      req.body.seller = seller
      Receipt.create(req.body)
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json({ error: err.message }))
    })
    .catch(err => res.status(400).json({ error: err.message }))
});

router.put('/:id', function (req, res, next) {
  Receipt.findOne({ where: { id: req.params.id } })
    .then(receipt => {
      if (receipt) {
        receipt.update(req.body)
          .then(updateReceipt => res.json({ result: updateReceipt }))
          .catch(_ => res.status(400).json({ error: err.message }))
      }
      else res.status(400).json({ error: "Bad request" })
    })
    .catch(err => { res.status(400).json({ error: err.message }) })
});


module.exports = router;
