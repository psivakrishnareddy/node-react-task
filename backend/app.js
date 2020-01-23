const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// app.use(morgan("dev"));
app.use(cors());

app.use("/", require("./Routes/index"));
app.use("/users", require("./Routes/userRoutes"));
app.use("/items", require("./Routes/itemRoutes"));

app.listen(PORT, console.log(`Server started at port ${PORT}`));
