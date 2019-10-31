const Category_Product = require('../models/category_product.model');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/WebBanHang'
mongoose.connect(url,{ useNewUrlParser: true });

const category_products = [
 new Category_Product({
  tendm:"Samsung",
  motadm:"ở hàn quốc" 
 }),
 new Category_Product({
  tendm:"Oppo",
  motadm:"ở trung quốc" 
 }),
 new Category_Product({
  tendm:"Nokia",
  motadm:"ở phần lan" 
 }),
 new Category_Product({
  tendm:"Apple",
  motadm:"ở usa" 
 }),
]

let done = 0;
for(var i= 0 ; i<category_products.length ; i++){
    category_products[i].save(     
        (err,result)=>{
            done++;
            if(done === category_products.length) {
                exit()
            }
        }
    );
}
function exit(){
    mongoose.disconnect();
}