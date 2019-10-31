const fs = require('fs')
const Product = require("../models/product.model");


module.exports.Products = (req, res, next) => {
  Product.find({}, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false, error: err })
    }
    else {
      res.status(200).json({ status: true, result: doc })
    }
  })
}

module.exports.ProductId = (req, res, next) => {
  Product.findById(req.params.id).exec((err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: "not fount id" });
    }
    res.status(200).json({ status: true, result: doc });
  });
}

module.exports.getProductsWithCategory = (req, res, next) => {
  let tendm = req.params.tendm
  Product.find({ tendm: tendm }, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: "not fount id" });
    }
    res.status(200).json({ status: true, result: doc });
  })

}

module.exports.toggleStatusProduct = (req, res, next) => {
  let id = req.params.id
  Product.findById(id, (err, doc) => {
    doc.trangthaisp = !doc.trangthaisp;
    doc.save((err, doc) => {
      if (err) {
        res.status(404).json({ status: false });
      }
      res.status(200).json({ status: true });
    })
  })
}
module.exports.toggleImageProduct = async (req, res, next) => {
  let id = req.params.id;
  let product = await Product.find({ "hinhanhsp._id": id })
  Product.updateOne(
    { _id: product[0]._id, "hinhanhsp.status": true },
    { $set: { "hinhanhsp.$.status": false } },
    (err, doc) => {
      Product.updateOne(
        { _id: product[0]._id, "hinhanhsp._id": req.params.id },
        {
          $set: { "hinhanhsp.$.status": true }
        },
        (err, doc) => {
          if (err) {
            res.status(404).json({ status: false });
          }
          res.status(200).json({ status: true });
        }
      );
    });
}

module.exports.removeImageProduct = (req, res, next) => {
  const id = req.params.id, index = req.params.index;
  Product.find({ "hinhanhsp._id": id }, (err, data) => {
    const array = data[0].hinhanhsp[index].path.split('/')
    const path = `uploads/${array[array.length - 1]}`
    if (fs.existsSync(path)) {
      fs.unlink(path, (err, doc) => {
        if (err) {
          res.status(404).json({ status: false })
        } else {
          Product.update(
            { "hinhanhsp._id": id },
            { $pull: { hinhanhsp: { _id: id } } },
            { multi: true },
            (err, doc) => {
              if (err) {
                res.status(404).json({ status: false })
              }
              res.status(200).json({ status: true })
            }
          );
        }
      })
    } else {
      Product.update(
        { "hinhanhsp._id": id },
        { $pull: { hinhanhsp: { _id: id } } },
        { multi: true },
        (err, doc) => {
          if (err) {
            res.status(404).json({ status: false })
          }
          res.status(200).json({ status: true })
        }
      );
    }

  })
}
module.exports.productsFilter = (req, res, next) => {

}
module.exports.postAddProduct = (req, res, next) => {
  let body = JSON.parse(req.body.product)
  // console.log(JSON.parse(req.body.product), req.file)
  if (body && req.file) {
    let newProduct = new Product()
    newProduct.tensp = body.tensp;
    newProduct.tendm = body.tendm;
    newProduct.giaspchuagiam = body.giaspchuagiam;
    newProduct.giaspdagiam = body.giaspdagiam;
    newProduct.motatomtatsp = body.motatomtatsp;
    newProduct.motachitietsp = body.motachitietsp;
    newProduct.soluongton = body.soluongton;
    newProduct.hinhanhsp = {
      path: `http://localhost:3000/uploads/${req.file.filename}`,
      status: true
    }
    newProduct.save((err, doc) => {
      if (err) {
        res.status(404).json({ status: false })
      }
      res.status(200).json({ status: true })
    })
  }
  else {
    res.status(404).json({ status: false })
  }
}
module.exports.putProduct = (req, res, next) => {
  let id = req.params.id
  Product.findOneAndUpdate({
    _id: id
  }, {
      $set: {
        tensp: req.body.tensp,
        giaspchuagiam: req.body.giaspchuagiam,
        giaspdagiam: req.body.giaspdagiam,
        tendm: req.body.tendm,
        motatomtatsp: req.body.motatomtatsp,
        motachitietsp: req.body.motachitietsp
      }
    }, { upsert: true }, (err, doc) => {
      if (err) {
        res.status(404).json({ status: false })
      }
      res.status(200).json({ status: true })
    });
}

module.exports.deleteProduct = (req, res, next) => {
  let id = req.params.id
  Product.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: "not fount id" });
    }
    res.status(200).json({ status: true });
  })
}
module.exports.postUploadImage = (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    console.log(req.file, id)
    Product.update(
      { _id: id },
      {
        $push: {
          hinhanhsp: {
            path: `http://localhost:3000/uploads/${req.file.filename}`
          }
        }
      },
      (err, doc) => {
        console.log(doc);
        res.status(200).json({ status: true });
      }
    );

  }

}

module.exports.productsFilter = (req, res, next) => {
  let product_fillter = req.params.product_fillter.toLowerCase();
  Product.find({ $text: { $search: product_fillter } }, (err, doc) => {
    if (err) {
      res.status(404).json({ status: false });
    }
    res.status(200).json({ status: true, result: doc });

  });
}
