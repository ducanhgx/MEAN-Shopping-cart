const express = require("express");
const router = express.Router();

const ctrCategorry_product = require("../controllers/category_product.controller");

router.get("/categoryProducts", ctrCategorry_product.categoryProducts);
router.get("/categoryProducts/:id", ctrCategorry_product.categoryProductId);
router.post("/categoryProduct", ctrCategorry_product.postcategoryProduct);
router.put('/categoryProducts/:id',ctrCategorry_product.putcategoryProduct)
router.get('/toggleCategory/:id',ctrCategorry_product.toggleStatusCategory)
router.delete('/categoryProducts/:id',ctrCategorry_product.deletecategoryProduct)
module.exports = router;