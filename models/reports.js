const mongoose = require("mongoose");
const reports = new mongoose.Schema({
  report: String,
  initiatedby: String,
  role:String
});
const reportitems = mongoose.model("reports", reports);
module.exports = reportitems;
