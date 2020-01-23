const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  console.log("Got the Get Response...");
  res.send("Welcome GET REQ Index");
});

module.exports = Router;
