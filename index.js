import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";

import { typeDefs } from "./src/typeDefs.js";
import { resolvers } from "./src/resolvers.js";

dotenv.config();
const server = async () => {
  const app = express();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  apolloServer.applyMiddleware({ app });

  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wlndq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.log(err);
  }

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to home page" });
  });

  app.listen({ port: 3000 }, () => {
    console.log("Node JS server is up and running!!");
  });
};

server();
