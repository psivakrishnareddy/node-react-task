const express = require("express");
const Router = express.Router();
const ic = require("../controllers/itemController");
const uuidv4 = require("uuid/v4");

Router.post("/add", (req, res, next) => {
  let item = {
    id: uuidv4(),
    itemname: req.body.itemname,
    tax: req.body.tax,
    image: req.body.image,
    itemDesc: req.body.itemDesc,
    userid: req.body.userid,
    date: req.body.today
  };
  let result = ic.addItem(item);
  result.then(data => {
    console.log(data);
    res.json(data);
  });
});

Router.get("/", (req, res, next) => {
  console.log("Got the Get Response...");
  //   res.send("Welcome GET Users");
  let result = ic.getItems();
  result.then(data => {
    console.log(data, "itemRoutes");
    res.status(201).json(data);
  });
});

Router.post("/edit/:id", (req, res, next) => {
  console.log("got the edit request.....");
  console.log(req.params.id, "item id");
  let item = {
    id: req.params.id,
    itemname: req.body.itemname,
    tax: req.body.tax,
    image: req.body.image,
    itemDesc: req.body.itemDesc
  };

  let result = ic.editItem(item);
  result.then(data => {
    console.log(item, "editing item..");
    res.json(data);
  });
});

Router.get("/delete/:id", (req, res, next) => {
  console.log("Delete item route");
  let result = ic.deleteItem(req.params.id);
  result.then(data => {
    res.json(data);
  });
});
Router.get("/itemsadded/:date", (req, res, next) => {
  console.log("items added....on particular date");
  let result = ic.getItemsByDate(req.params.date);
  result.then(data => {
    res.json(data);
  });
});

module.exports = Router;
