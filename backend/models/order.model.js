const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name can't be empty"
  },
  phone: {
    type: String,
    required: "phone can't be empty"
  },
  email: {
    type: String,
    required: "email can't be empty"
  },
  address: {
    type: String,
    required: "address can't be empty"
  },
  note: {
    type: String,
    required: "note can't be empty"
  },
  status: {
    type: Boolean,
    default:false
  },
  totalprice: {
    type: Number,
    required: "totalprice can't be empty"
  },
  order: Array,

});
orderSchema.index({
  name: 'text'
});
orderSchema.set("timestamps", true);
module.exports = mongoose.model("order", orderSchema);
