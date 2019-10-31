const mongoose = require("mongoose");

var category_productSchema = new mongoose.Schema({
  tendm: {
    type: String,
    required: "tendm can't be empty"
  },
  motadm: {
    type: String,
    required: "motadm can't be empty"
  },
  trangthaidm: {
    type: Boolean,
    required: "trangthaidm can't be empty",
    default: true
  }
});
category_productSchema.set("timestamps", true);
module.exports = mongoose.model("categoryProduct", category_productSchema);
