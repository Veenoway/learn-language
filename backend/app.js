const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/index.js");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const port = 4000;
const cors = require("cors");

const mongoose = require("mongoose");

app.use(cors());

mongoose.connect(MONGO_URI, {
  dbName: "chinese-db",
});
mongoose.connection.once("open", async () => {
  console.log("Connected to DB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
