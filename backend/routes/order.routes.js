const express = require("express");
const router = express.Router();
const ctrOrder = require("../controllers/order.controller");
const jwtHelper = require('../config/jwtHelper');
router.get('/orders',jwtHelper.verifyJwtToken,ctrOrder.orders)
router.get('/orders/:id',jwtHelper.verifyJwtToken,ctrOrder.order)
router.put('/orders/:id',jwtHelper.verifyJwtToken,ctrOrder.putstatusorder)
// router.put('/orders/update/:id',ctrOrder.putqtyProduct)
router.post('/orders',ctrOrder.postorder)
router.delete('/orders/:id',jwtHelper.verifyJwtToken,ctrOrder.deleteorder)

module.exports = router