const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var productSchema = new mongoose.Schema({
  tensp: {
    type: String,
    required: "tensp can't be empty"
  },
  motatomtatsp: {
    type: String,
    required: "motatomtatsp can't be empty"
  },
  motachitietsp: {
    type: String,
    required: "motachitietsp can't be empty"
  },
  soluongton: {
    type: Number,
    required: "soluongton can't be empty"
  },
  hinhanhsp: [
    {
      path: {
        type: String,
        required: "path can't be empty"
      },
      status: {
        type: Boolean,
        default: false
      }
    }
  ],
  giaspchuagiam: {
    type: Number,
    required: "giaspchuagiam can't be empty"
  },
  giaspdagiam: {
    type: Number,
    required: "giaspdagiam can't be empty"
  },
  trangthaisp: {
    type: Boolean,
    required: "trangthaisp can't be empty",
    default: true
  },
  tendm: {
    type: String,
    required: "giaspdagiam can't be empty"
  }
});
productSchema.index({
  tensp: 'text'
});
productSchema.set("timestamps", true);
module.exports = mongoose.model("product", productSchema);
