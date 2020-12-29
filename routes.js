const express = require("express");
const searchRoutes = express.Router();
const cors = require("cors");
const app = express();
const Site = require("./siteSchema");
const textProcessUtils = require("./textProcessUtils");
const SORT_BY_RELEVANCE = 'relevance'
const SORT_BY_OLD_FIRST = 'dateOld'
const SORT_BY_NEW_FIRST = 'dateNew'

app.use(cors());

searchRoutes.route("/search").post((req, res) => {
  getSearchResults(req.body, res);
});

async function getSearchResults(reqbody, res) {
  try {
    const processedSearchTerm = textProcessUtils.getProcessedContent(
      reqbody.searchTerm
    );
    // const params = createQueryParams(reqbody, processedSearchTerm);
    //console.log(JSON.stringify(params));
    // const queryFilter = getQueryFilter(params);
    //console.log(JSON.stringify(queryFilter));
    const sortFilter = getSortFilter(reqbody)
    console.log('SORT BY: ' + JSON.stringify(sortFilter))
    const results = await Site.find(
      { $text: { $search: processedSearchTerm } },
      { score: { $meta: "textScore" }, loc: 1, title: 1, _id: 0, lastmod: 1 }
    ).sort(sortFilter);
    // console.log("Results: " + results);
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

function getSortFilter (reqBody) {
  switch(reqBody.sortBy) {
    case SORT_BY_RELEVANCE:
      return  { score: { $meta: "textScore" } }
    case SORT_BY_OLD_FIRST:
      return { lastmod: 1 }
    case SORT_BY_NEW_FIRST:
      return { lastmod: -1 }
  }
}
// function getSearchTerm (searchConfigs, processedTerm){
//   const searchTerm = {
//     $text: {    
//   }}
//   if (searchConfigs.isExactTermSearch === "true")
//     searchTerm = {
      
//     } '"' + processedTerm + '"';
//   else qParams.searchTerm = processedTerm;
// }
// function createQueryParams(searchConfigs, processedTerm) {
//   const qParams = {};
//   // Search Term
//   if (searchConfigs.isExactTermSearch === "true")
//     qParams.searchTerm = '"' + processedTerm + '"';
//   else qParams.searchTerm = processedTerm;

//   // Timeframe
//   let date = new Date();
//   switch (searchConfigs.timeframe) {
//     case "today":
//       qParams.date = date.setDate(date.getDate() - 1);
//       break;
//     case "lastMonth":
//       qParams.date = date.setMonth(date.getMonth() - 1);
//       break;
//     case "lastYear":
//       qParams.date = date.setMonth(date.getMonth() - 12);
//       break;
//     case "allTime":
//       qParams.date = 0;
//       break;
//   }
//   return qParams;
// }

// function queryByRelevance(params) {
//   if (params.date) {
//     return {
//       $text: {
//         $search: params.searchTerm,
//       },
//       lastmod: { $gt: params.date },
//     };
//   } else {
//     return {
//       $text: {
//         $search: params.searchTerm,
//       },
//     };
//   }
// }

module.exports = searchRoutes;
