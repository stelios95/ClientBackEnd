const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const getPwd = require("./databasePasswordFetch");
const cors = require("cors");
const searchRoute = require("./routes");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/searchApi", searchRoute);

// connect to database
const pwd = getPwd();
const mongoUrl =
  "mongodb+srv://dbAdmin:" +
  pwd +
  "@cluster0-xy1h1.mongodb.net/test?retryWrites=true&w=majority";

//connect to MongoDBo on Atlas
async function connectToMongo() {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    console.log("Successfully connected to AtlasDB!");
  } catch (err) {
    console.log("Error connecting to AtlasDB: " + err);
  }
}
connectToMongo();

//server starts listening here
app.listen(PORT, function () {
  console.log("Server is running on Port: ", PORT);
});
