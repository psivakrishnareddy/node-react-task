const db = require("../config/dbConfig");

const addItem = item => {
  let query = `INSERT into items VALUES ('${item.id}','${item.itemname}','${item.tax}','${item.image}','${item.itemDesc}','${item.userid}','${item.date}')`;
  data = db
    .query(query)
    .then(result => {
      return { msg: "successflly added.. ", created: true };
    })
    .catch(err => {
      console.log("unable To add item.", err);
      return { msg: "unable to add item.. ", created: false };
    });

  return data;
};
const getItems = () => {
  let data;

  console.log("show items...");
  data = db
    .query(`SELECT * FROM  items  `)
    .then(result => {
      // console.log(result.rows);
      return result.rows;
    })
    .catch(err => {
      console.log(err, "Failed To connect");
    });

  return data;
};

const getItemsByDate = date => {
  let data;

  console.log("show items on particular date.....");
  data = db
    .query(`SELECT * FROM  items WHERE date='${date}' `)
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => {
      console.log(err, "Failed To connect");
    });

  return data;
};

const editItem = item => {
  console.log("edit item");
  let query = `UPDATE items SET itemname='${item.itemname}' ,tax='${item.tax}', itemimage='${item.image}', itemdesc='${item.itemDesc}' WHERE id='${item.id}'`;
  let data = db
    .query(query)
    .then(result => {
      // console.log(result);
      return { msg: "edited succesfully", edited: true };
    })
    .catch(err => {
      console.log("Error:", err);
      return { msg: "unable to edit.", edited: false };
    });
  return data;
};

const deleteItem = id => {
  let query = `DELETE FROM items WHERE id='${id}'`;
  let data = db
    .query(query)
    .then(result => {
      return { msg: "item Deleted", deleted: true };
    })
    .catch(err => {
      console.log(err, "ERror");
      return { msg: "item can't be Deleted", deleted: false };
    });
  return data;
};

module.exports = {
  addItem,
  getItems,
  editItem,
  deleteItem,
  getItemsByDate
};
