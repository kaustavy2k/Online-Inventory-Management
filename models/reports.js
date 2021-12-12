const mongoose = require("mongoose");
const reports = new mongoose.Schema({
  report: String,
  initiatedby: String,
  role: String,
  date: String,
});
const reportitems = mongoose.model("reports", reports);
module.exports = reportitems;
