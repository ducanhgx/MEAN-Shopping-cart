const express = require("express");
const multer = require('multer');
const path = require('path');

const DIR = './uploads';
 

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname);
      // cb(null,file.originalname);
    }
});
let upload = multer({storage: storage});

const router = express.Router();
const ctrProduct = require("../controllers/product.controller");
const jwtHelper = require('../config/jwtHelper');
router.get("/products", ctrProduct.Products);
router.get("/product/:id", ctrProduct.ProductId);
router.get("/products/:tendm", ctrProduct.getProductsWithCategory);
router.get("/product/toggle/:id",jwtHelper.verifyJwtToken, ctrProduct.toggleStatusProduct);
router.get('/product/image/update/status/:id',jwtHelper.verifyJwtToken,ctrProduct.toggleImageProduct)
router.get('/product/image/:id/:index',ctrProduct.removeImageProduct)
router.get("/products/productsfillter/:product_fillter", ctrProduct.productsFilter);
// router.post("/products", ctrProduct.postProduct);
router.put('/products/:id',jwtHelper.verifyJwtToken,ctrProduct.putProduct)
router.delete('/products/:id',jwtHelper.verifyJwtToken,ctrProduct.deleteProduct)
router.post('/product/upload/:id',upload.single('myimage'),ctrProduct.postUploadImage)
router.post('/products',upload.single('myimage'),ctrProduct.postAddProduct)
module.exports = router;