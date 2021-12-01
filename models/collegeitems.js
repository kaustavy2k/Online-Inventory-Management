const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  quantity: Number,
});
const collegeitems = mongoose.model("collegeitems", collegeSchema);
module.exports = collegeitems;
