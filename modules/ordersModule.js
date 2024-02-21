"use strict";
const { getCollection, toObjectId } = require("./dbModule.js");

const entity = "orders";

async function addOrder(cart) {
  try {
    const collection = await getCollection(entity);
    await collection.insertOne(cart);
    console.log(`A order has added for a user "${cartUsername}" `);
  } catch (error) {
    console.log(error);
  }
}

async function getOrders() {
  try {
    const collection = await getCollection(entity);
    const orders = await collection.find({}).toArray();
    return orders;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addOrder,
  getOrders,
};
