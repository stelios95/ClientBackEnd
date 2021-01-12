//API constants

//Sorting Constants
const SORT_BY_RELEVANCE = 'relevance'
const SORT_BY_OLD_FIRST = 'dateOld'
const SORT_BY_NEW_FIRST = 'dateNew'

//Timeframe Constants
const FILTER_TODAY = 'today'
const FILTER_LAST_MONTH = 'lastMonth'
const FILTER_LAST_YEAR = 'lastYear'
const FILTER_ALL_TIME = 'allTime'
const FILTER_RANGE = 'range'

//Exact Phrase
const SEARCH_EXACT_PHRASE = 'true'

//result limit
const RETURNED_DOCS_LIMIT = 1200

//Database Strings
const DATABASE_PREFIX = "mongodb+srv://dbAdmin:"
const DATABASE_SUFFIX = "@cluster0-xy1h1.mongodb.net/test?retryWrites=true&w=majority"

module.exports = {
  SORT_BY_RELEVANCE: SORT_BY_RELEVANCE,
  SORT_BY_OLD_FIRST: SORT_BY_OLD_FIRST,
  SORT_BY_NEW_FIRST: SORT_BY_NEW_FIRST,
  FILTER_TODAY: FILTER_TODAY,
  FILTER_LAST_MONTH: FILTER_LAST_MONTH,
  FILTER_LAST_YEAR: FILTER_LAST_YEAR,
  FILTER_ALL_TIME: FILTER_ALL_TIME,
  FILTER_RANGE: FILTER_RANGE,
  SEARCH_EXACT_PHRASE: SEARCH_EXACT_PHRASE,
  RETURNED_DOCS_LIMIT: RETURNED_DOCS_LIMIT,
  DATABASE_PREFIX: DATABASE_PREFIX,
  DATABASE_SUFFIX: DATABASE_SUFFIX
}