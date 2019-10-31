
const express = require('express');
const router = express.Router();

const ctrlKhachhang = require('../controllers/customer.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlKhachhang.register);
router.post('/authenticate', ctrlKhachhang.authenticate);
router.put('/customerorder',jwtHelper.verifyJwtToken, ctrlKhachhang.putOrderCustomer);
router.put('/customerprofile',jwtHelper.verifyJwtToken, ctrlKhachhang.putProfileCustomer);
router.get('/customerprofile',jwtHelper.verifyJwtToken, ctrlKhachhang.customerProfile);
router.put('/customertransactionhistory',jwtHelper.verifyJwtToken, ctrlKhachhang.putTransactionHistoryCustomer)
module.exports = router;



