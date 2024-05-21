const graphql = require("graphql");
const Card = require("../models/card");
const User = require("../models/user");
const Tab = require("../models/tab");
const { ObjectId } = require("mongodb");
const DB_NAME = "chinese-db";
const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

const TabsType = new GraphQLObjectType({
  name: "Tabs",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    cards: {
      type: new GraphQLList(CardType),
      async resolve(parent, args) {
        return Card.find({ _id: { $in: parent.cards } });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    address: { type: GraphQLString },
    tabs: {
      type: new GraphQLList(TabsType),
      resolve(parent, args) {
        return Tab.find({ _id: { $in: parent.tabs } });
      },
    },
  }),
});

const CardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    _id: { type: GraphQLID },
    hanzi: { type: GraphQLString },
    pinyin: { type: GraphQLString },
    francais: { type: GraphQLString },
  }),
});

const CardInputType = new GraphQLInputObjectType({
  name: "CardInput",
  fields: () => ({
    hanzi: { type: GraphQLString },
    pinyin: { type: GraphQLString },
    francais: { type: GraphQLString },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCard: {
      type: CardType,
      args: {
        address: { type: GraphQLString },
        card: { type: CardInputType },
        tabID: { type: GraphQLID },
      },
      async resolve(parent, args) {
        try {
          const user = await User.findOne({ address: args.address });
          if (!user) {
            throw new Error("User not found");
          }

          const tab = await Tab.findById(args.tabID);
          if (!tab) {
            throw new Error("Tab not found");
          }

          const newCard = new Card({
            _id: new mongoose.Types.ObjectId(),
            pinyin: args.card.pinyin,
            hanzi: args.card.hanzi,
            francais: args.card.francais,
          });

          await newCard.save();

          tab.cards.push(newCard._id);

          await tab.save();
          user.tabs.push(tab);
          user.save();

          return newCard;
        } catch (error) {
          throw error;
        }
      },
    },
    createUser: {
      type: UserType,
      args: {
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = User.findOne({ address: args.address });

        if (user) {
          throw Error("User already exist");
        }
        const newUser = new User({
          address: args.address,
          tabs: [],
        });

        return newUser.save();
      },
    },
    createTab: {
      type: TabsType,
      args: {
        address: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const user = await User.findOne({ address: args.address }).populate(
            "tabs"
          );
          if (!user) {
            throw new Error("User not found");
          }

          const existingTab = user.tabs.find((t) => t.name === args.name);
          if (existingTab) {
            throw new Error("Tab already exists");
          }

          const newTab = new Tab({
            _id: new mongoose.Types.ObjectId(),
            name: args.name,
            cards: [],
          });

          await newTab.save();

          user.tabs.push(newTab._id);

          await user.save();

          return newTab;
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      async resolve() {
        const user = await User.find();
        console.log("users", user);
        return await User.find();
      },
    },
    user: {
      type: UserType,
      args: { address: { type: GraphQLString } },
      async resolve(parent, args) {
        const user = await User.findOne({ address: args.address }).populate({
          path: "tabs",
          populate: { path: "cards" },
        });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      },
    },
    tab: {
      type: TabsType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const tab = await Tab.findById(args.id).populate("cards");
        if (!tab) {
          throw Error("No tab found");
        }
        return tab;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
