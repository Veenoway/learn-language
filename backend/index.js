const express = require("express");
const { MongoClient } = require("mongodb");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const DB_NAME = "chinese-db";
const MONGO_URI = process.env.MONGO_URI;

let database;

// Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    address: String!
  }

  type Query {
    user(address: String!): User
    users: [User]
  }
`;

// Define GraphQL resolvers
const resolvers = {
  Query: {
    user: async (_, { address }) => {
      return await database.collection("user").findOne({ address: address });
    },
    users: async () => {
      return await database.collection("user").find({}).toArray();
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply Apollo Server middleware to Express app
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Define REST endpoint
app.get("/api/user", async (req, res) => {
  try {
    const users = await database.collection("user").find({}).toArray();
    res.send(users);
  } catch (err) {
    console.error("Failed to fetch users", err);
    res.status(500).send("Failed to fetch users");
  }
});

// Start Express server and connect to MongoDB
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables");
    return;
  }

  try {
    const client = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = client.db(DB_NAME);
    console.log(`Connected to MongoDB`);
    console.log(`Connected to ${DB_NAME} database`);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
});
