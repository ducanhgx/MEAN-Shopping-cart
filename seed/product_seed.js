const Product = require('../models/product.model');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/WebBanHang'
mongoose.connect(url, { useNewUrlParser: true });

const products = [
  new Product({
    tensp: "IPHONE XS MAX 64GB ",
    motatomtatsp: "mô tả tóm tắt sản phẩm ở đây",
    motachitietsp: "mô tả chi tiết sản phẩm ở đây",
    soluongton: 10,
    hinhanhsp: [
      {
        path: "https://cdn.fptshop.com.vn/Uploads/Originals/2018/10/11/636748771945393060_iPhone-Xs-Max-gold.png",
        status: true
      }
    ],
    giaspchuagiam: 20000000,
    giaspdagiam: 19500000,
    tendm: "Apple"
  }),
  new Product({
    tensp: "Samsung Galaxy S10 8GB/128GB Xanh lá (Hàng chính hãng)",
    motatomtatsp: "mô tả tóm tắt sản phẩm ở đây",
    motachitietsp: "mô tả chi tiết sản phẩm ở đây",
    soluongton: 10,
    hinhanhsp: [
      {
        path: "https://bachlongmobile.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/s/1/s10_plus.jpg",
        status: true
      }
    ],
    giaspchuagiam: 18000000,
    giaspdagiam: 17500000,
    tendm: "Samsung"
  }),
  new Product({
    tensp: "Samsung Galaxy Note9 128GB",
    motatomtatsp: "mô tả tóm tắt sản phẩm ở đây",
    motachitietsp: "mô tả chi tiết sản phẩm ở đây",
    soluongton: 10,
    hinhanhsp: [
      {
        path: "https://cdn.tgdd.vn/Products/Images/42/154897/samsung-galaxy-note-9-black-400x460-400x460.png",
        status: true
      }
    ],
    giaspchuagiam: 13000000,
    giaspdagiam: 12500000,
    tendm: "Samsung"
  }),
  new Product({
    tensp: "Oppo F11 6GB/128GB Tím",
    motatomtatsp: "mô tả tóm tắt sản phẩm ở đây",
    motachitietsp: "mô tả chi tiết sản phẩm ở đây",
    soluongton: 10,
    hinhanhsp: [
      {
        path: "http://p.ipricegroup.com/uploaded_7cbfb89e06f118619ee2a80a445d5fd0.jpg",
        status: true
      }
    ],
    giaspchuagiam: 9000000,
    giaspdagiam: 8500000,
    tendm: "Oppo"
  }),
  new Product({
    tensp: "Nokia pureview 9",
    motatomtatsp: "mô tả tóm tắt sản phẩm ở đây",
    motachitietsp: "mô tả chi tiết sản phẩm ở đây",
    soluongton: 10,
    hinhanhsp: [
      {
        path: "https://cdn.tgdd.vn/Products/Images/42/197783/nokia-9-pureview-1-400x460.png",
        status: true
      }
    ],
    giaspchuagiam: 18800000,
    giaspdagiam: 18500000,
    tendm: "Nokia"
  }),
]

let done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(
    (err, result) => {
      done++;
      if (done === products.length) {
        exit()
      }
    }
  );
}
function exit() {
  mongoose.disconnect();
}