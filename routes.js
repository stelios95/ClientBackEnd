const express = require("express");
const API_CONSTANTS = require("./apiConstants")
const searchRoutes = express.Router();
const cors = require("cors");
const app = express();
const Site = require("./siteSchema");
const textProcessUtils = require("./textProcessUtils");

app.use(cors());

searchRoutes.route("/search").post((req, res) => {
  getSearchResults(req.body, res);
});

async function getSearchResults(reqbody, res) {
  try {
    const processedSearchTerm = textProcessUtils.getProcessedContent(
      reqbody.searchTerm
    );
    const results = await Site.find(
      getQueryFilter(reqbody, processedSearchTerm),
      { score: { $meta: "textScore" }, loc: 1, title: 1, _id: 0, lastmod: 1 }
    ).sort(getSortFilter(reqbody)).limit(API_CONSTANTS.RETURNED_DOCS_LIMIT);
    res.status(200).send(results);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
}

function getSortFilter (reqBody) {
  switch(reqBody.sortBy) {
    case API_CONSTANTS.SORT_BY_RELEVANCE:
      return  { score: { $meta: "textScore" } }
    case API_CONSTANTS.SORT_BY_OLD_FIRST:
      return { lastmod: 1 }
    case API_CONSTANTS.SORT_BY_NEW_FIRST:
      return { lastmod: -1 }
  }
}

function getQueryFilter (reqBody, processedSearchTerm) {
  let date = new Date();
  let queryDate 
  switch (reqBody.timeframe) {
    case API_CONSTANTS.FILTER_TODAY:
      newDate = new Date(date.setDate(date.getDate() - 1))
      queryDate = new Date(newDate.setHours(00, 00, 00))
      break;
    case API_CONSTANTS.FILTER_LAST_MONTH:
      newDate = new Date(date.setMonth(date.getMonth() - 1))
      queryDate = new Date(newDate.setHours(00, 00, 00))
      break;
    case API_CONSTANTS.FILTER_LAST_YEAR:
      newDate = new Date(date.setFullYear(date.getFullYear() - 1))
      queryDate = new Date(newDate.setHours(00, 00, 00))
      break;
    case API_CONSTANTS.FILTER_ALL_TIME:
      queryDate = 0;
      break;
  }
  if (reqBody.isExactTermSearch === API_CONSTANTS.SEARCH_EXACT_PHRASE) {
    if (!queryDate){
      return { $text: { $search: `\"${processedSearchTerm}\"`}}
    } else {
      return { $text: { $search: `\"${processedSearchTerm}\"` }, lastmod: {
        $gte: queryDate,
        $lt: new Date(new Date().setHours(23, 59, 59))
      }}
    }
  } else {
    if (!queryDate){
      return { $text: { $search: processedSearchTerm }}
    } else {
      return { $text: { $search: processedSearchTerm }, lastmod: {
        $gte: queryDate,
        $lt: new Date(new Date().setHours(23, 59, 59))
      }}
    }
  }
}

module.exports = searchRoutes;
