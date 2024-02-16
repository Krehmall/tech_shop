"use strict";
// const { MongoClient, ObjectId } = require("mongodb");
const { getCollection, toObjectId } = require("./dbModule.js");
// const { getProductById, getProducts, updateProductStockBy, uniqueValuesByKey } = require("./productsModule.js");
const { addUser, getUserByUsername, updatePassword } = require("./usersModule.js");

const entity = "carts";

async function addProductToCart(product, cartUsername) {
  try {
    const [collection, userCart] = await getCart(cartUsername);
    const isProductInCart = userCart.productsInCart.find((item) => item.name === product.name);
    if (isProductInCart) {
      const index = userCart.productsInCart.indexOf(isProductInCart);
      userCart.productsInCart[index].items++;
    } else {
      product.items = 1;
      userCart.productsInCart.push(product);
    }
    await collection.updateOne({ username: cartUsername }, { $set: { productsInCart: userCart.productsInCart } });
    console.log(`A product has been added to cart for a user "${cartUsername}" `);
  } catch (error) {
    console.log(error);
  }
}

async function removeProductFromCart(product, cartUsername) {
  try {
    const [collection, userCart] = await getCart(cartUsername);
    const isProductInCart = userCart.productsInCart.find((item) => item.name === product.name);
    if (isProductInCart) {
      const index = userCart.productsInCart.indexOf(isProductInCart);
      if (userCart.productsInCart[index].items > 1) {
        userCart.productsInCart[index].items--;
      } else {
        userCart.productsInCart.splice(index, 1);
      }
    } else {
      throw new Error("The product isn't in cart !!!");
    }
    await collection.updateOne({ username: cartUsername }, { $set: { productsInCart: userCart.productsInCart } });
    console.log(`A product has been removed from cart for a user "${cartUsername}" `);
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
    console.log(cart);
    return [collection, cart];
  } catch (error) {
    console.log(error);
  }
}

async function createCart(cartUsername) {
  try {
    const collection = await getCollection(entity);
    if (!(await getUserByUsername(cartUsername))) {
      throw new Error("There is no such a user!!!");
    } else if (await getCart(cartUsername)) {
      throw new Error("This user already have a cart!!!");
    }
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

async function removeCart(cartUsername) {
  try {
    const [collection, userCart] = await getCart(cartUsername);
    collection.deleteOne(userCart);
    console.log(`A cart has been removed for a user "${cartUsername}"`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addProductToCart,
  removeProductFromCart,
  getCart,
  createCart,
  removeCart,
};
