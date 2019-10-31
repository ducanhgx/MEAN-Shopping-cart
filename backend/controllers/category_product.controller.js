const categoryProduct = require("../models/category_product.model");
const Product = require("../models/product.model");
// var generateSafeId = require("generate-safe-id");
module.exports.categoryProducts = (req, res, next) => {
  categoryProduct.find({}).exec((err, categoryProducts) => {
    if (err) {
      res.send(`Error retrieving videos `);
    }
    res.json({ status: true, result: categoryProducts });
  });
};

module.exports.categoryProductId = (req, res, next) => {
  console.log(req.params.id)
  categoryProduct.findById(req.params.id).exec((err, categoryProduct) => {
    if (err) {
      res.status(404).json({ status: false, messger: "not fount id" });
    }
    res.status(200).json({ status: true, result: categoryProduct });
  });
};
module.exports.postcategoryProduct = (req, res, next) => {
  var newcategoryProduct = new categoryProduct()
  newcategoryProduct.tendm = req.body.tendm;
  newcategoryProduct.motadm = req.body.motadm;
  newcategoryProduct.save((err, doc) => {
    if (err) {
      res.status(501).json({ status: false, messger: "error saving newcategoryProduct" });
    }
    else {
      res.status(200).json({ status: true, result: doc });
    }

  });
};
module.exports.toggleStatusCategory = (req, res, next) => {
  categoryProduct.findById(req.params.id).exec((err, doc) => {
    if (err) {
      res.status(501).json({ status: false, messger: "error toggle categoryProduct" });
    } else {
      doc.trangthaidm = !doc.trangthaidm;
      doc.save()
      res.status(200).json({ status: true });
    }
  })

}
module.exports.putcategoryProduct = (req, res, next) => {
  categoryProduct.findById(req.params.id,(err, docold) => {
    let tendmcu = docold.tendm;
    docold.tendm = req.body.tendm;
    docold.motadm = req.body.motadm;
    docold.save(
      (err, docnew) => {
        let tendmmoi = docnew.tendm
        var query = { tendm: tendmcu };
        var valueUpdate = { $set: { tendm: tendmmoi } };
        if (docnew) {
          Product.updateMany(query, valueUpdate, (err, result) => {
            if (err) {
              console.log("update document error");
            } else {
              console.log(result)
              res.status(200).json({ status: true });
            }
          });
        }
      }
    );
  });

}

module.exports.deletecategoryProduct = (req, res, next) => {
  categoryProduct.findByIdAndDelete(req.params.id, (err, doc) => {
    if (doc) {
      Product.deleteMany({ tendm: doc.tendm }, (err, doc) => {
        if (err) {
          res.status(404).json("not fount tendm");
          next(err);
        }
        else {
          res.status(200).json({ status: true });
        }
      });
    }
    else {
      res.status(404).json("not fount id");
    }
  });
};
