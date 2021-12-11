const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
  item: {
    type: String,
  },
  quantity: Number,
  cost: String
});
const inventoryitems = mongoose.model("inventoryitems", inventorySchema);
module.exports = inventoryitems;
