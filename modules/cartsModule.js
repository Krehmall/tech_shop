"use strict";
const fs = require("fs");
const path = require("path");
const PATH_TO_JSON_FILE = path.join(__dirname, "../data/carts.json");
const { getCollection } = require("./dbModule.js");

const entity = "carts";

async function refreshCart(products, cartUsername) {
  try {
    const collection = await getCollection(entity);
    await collection.updateOne({ username: cartUsername }, { $set: { productsInCart: products } });
    console.log(`A cart has been updated for a user "${cartUsername}" `);
  } catch (error) {
    console.log(error);
  }
}

async function getCart(cartUsername) {
  try {
    const collection = await getCollection(entity);
    const cart = await collection.findOne({ username: cartUsername });
    if (!cart) {
      throw new Error("There is no cart exist for that user!!!");
    }
    return cart;
  } catch (error) {
    console.log(error);
  }
}

async function createCart(cartUsername) {
  try {
    const collection = await getCollection(entity);
    const emptyCart = {
      username: cartUsername,
      productsInCart: [],
    };
    console.log(`New cart has been created for user "${cartUsername}"`);
    collection.insertOne(emptyCart);
  } catch (error) {
    console.log(error);
  }
}

async function clearCart(cartUsername) {
  try {
    const collection = await getCollection(entity);
    await collection.updateOne({ username: cartUsername }, { $set: { productsInCart: [] } });
    console.log(`A cart has been cleared for a user "${cartUsername}"`);
  } catch (error) {
    console.log(error);
  }
}

async function initCarts() {
  try {
    const collection = await getCollection(entity);
    const carts = await collection.find({}).toArray();
    if (carts.length === 0) {
      const content = fs.readFileSync(PATH_TO_JSON_FILE, "utf-8");
      await collection.insertMany(JSON.parse(content));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  refreshCart,
  getCart,
  createCart,
  clearCart,
  initCarts,
};
