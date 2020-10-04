const express = require("express");
const searchRoutes = express.Router();
const cors = require("cors");
const app = express();
const Site = require("./siteSchema");
const textProcessUtils = require("./textProcessUtils");

app.use(cors());

searchRoutes.route("/search").post((req, res) => {
  getSearchResults(req.body.searchTerm, res);
});

async function getSearchResults(searchTerm, res) {
  try {
    console.log("inside");
    const processedSearchTerm = textProcessUtils.getProcessedContent(
      searchTerm
    );
    const results = await Site.find(
      { $text: { $search: processedSearchTerm } },
      { score: { $meta: "textScore" }, loc: 1, title: 1, _id: 0 }
    ).sort({ score: { $meta: "textScore" } });
    res.status(200).send(results);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(400).send(err);
  }
}

module.exports = searchRoutes;
