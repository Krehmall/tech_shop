"use strict";

const { getCollection, toObjectId } = require("./dbModule.js");

const entity = "products";

async function getProductById(id) {
  try {
    const collection = await getCollection(entity);
    const product = await collection.findOne(toObjectId(id));
    return product;
  } catch (error) {
    console.log(error);
  }
}
async function getProducts(filterBy = null, value, sortBy = null) {
  try {
    let filter = 0;
    let sorter = 0;
    if (typeof filterBy === "string") {
      filter = JSON.parse(`{"${filterBy}":"${value}"}`);
    } else {
      filter = {};
    }
    if (typeof sortBy === "string") {
      sorter = JSON.parse(`{"${sortBy}":1}`);
    } else {
      sorter = {};
    }
    const collection = await getCollection(entity);
    const products = await collection.find(filter).sort(sorter).toArray();
    const message = `We got ${products.length} items sorted by ${sortBy} and filtered by "${filterBy}":"${value}" `;
    console.log(message);
    console.log(products)
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function updateProductStockBy(productId, num) {
  try {
    const collection = await getCollection(entity);
    const product = await collection.findOne(toObjectId(productId));
    if (product.stock + num < 0) {
      throw new Error("The product stock cannot be below 0!!!");
    }
    collection.updateOne({ _id: toObjectId(productId) }, { $inc: { stock: num } });
    console.log(product);
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
module.exports = { getProductById, getProducts, updateProductStockBy, uniqueValuesByKey };
