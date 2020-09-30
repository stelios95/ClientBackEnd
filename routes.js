const express = require("express");
const searchRoutes = express.Router();
const cors = require("cors");
const app = express();

app.use(cors());

searchRoutes.route("/search").get((req, res) => {
  res.status(200).send("OK");
});

module.exports = searchRoutes;
