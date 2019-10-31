const express = require('express');
const router = express.Router();

const ctrlAdmin = require('../controllers/admin.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/admin/register', ctrlAdmin.register);
router.post('/admin/authenticate', ctrlAdmin.authenticate);
router.get('/adminProfile',jwtHelper.verifyJwtToken, ctrlAdmin.adminProfile);
router.get('/customers',jwtHelper.verifyJwtToken,ctrlAdmin.customers)
router.delete('/customers/:id',jwtHelper.verifyJwtToken,ctrlAdmin.deleteCustomer)

module.exports = router;



