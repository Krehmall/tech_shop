"use strict";

const USER_KEY = "loggedInUser";
const PRODUCTS_KEY = "products";
const CART_KEY = "cart";
const ORDERS_KEY = "orders";

const storageService = {
  getProducts() {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
    return products || null;
  },
  setProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },
  getUser() {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user || null;
  },
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getCart() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY));
    return cart || null;
  },
  setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  clearCart() {
    localStorage.removeItem(CART_KEY);
  },
  getOrders() {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY));
    return orders || null;
  },
  setOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },
  clearAll() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
  },
};
