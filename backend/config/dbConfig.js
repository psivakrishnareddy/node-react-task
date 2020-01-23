const Pool = require("pg").Pool;
const db = new Pool({
  user: "siva",
  host: "localhost",
  database: "codingmart-node",
  password: "siva123",
  port: 5432
});
db.on("connect", () => {
  console.log("Db connecteed succesfully...");
});
module.exports = db;
