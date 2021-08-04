const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.json({ hi: 'Express' });
});

const receiptsRouter = require('./receipts');
router.use('/receipts', receiptsRouter);


module.exports = router;
