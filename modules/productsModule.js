"use strict";

const fs = require("fs");
const path = require("path");
const PATH_TO_JSON_FILE = path.join(__dirname, "../data/products.json");

const { getCollection } = require("./dbModule.js");

const entity = "products";

async function getProducts() {
  try {
    const collection = await getCollection(entity);
    const products = await collection.find({}).toArray();
    console.log(products);

    return products;
  } catch (error) {
    console.log(error);
  }
}

async function uniqueValuesByKey(key) {
  try {
    const collection = await getCollection(entity);
    const result = await collection.distinct(key);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function initProducts() {
  try {
    const collection = await getCollection(entity);
    const products = await collection.find({}).toArray();
    if (products.length === 0) {
      const content = fs.readFileSync(PATH_TO_JSON_FILE, "utf-8");
      await collection.insertMany(JSON.parse(content));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getProducts, uniqueValuesByKey, initProducts };
