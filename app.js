const express = require("express");
const cookieParser = require("cookie-parser");
const getItems = require("./routes/getItems");
const cors = require("cors");
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/", getItems);
app.use(express.static(__dirname + "/client/build"));
app.get("*", (req, res) => {
  res.status(200).sendFile("index.html", { root: __dirname + "/client/build" });
});
module.exports = app;
