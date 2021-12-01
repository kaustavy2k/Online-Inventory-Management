const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  quantity: Number,
  status: String,
  initiatedby: String,
  statusby: String,
  cost: {
    type: String,
    default: "--",
  },
});
const transactionitems = mongoose.model("transactions", transactionSchema);
module.exports = transactionitems;
