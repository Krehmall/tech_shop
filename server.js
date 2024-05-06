const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require("path");
const { addUser, getUserByEmail, initUsers } = require("./modules/usersModule.js");
const { getProducts, uniqueValuesByKey, initProducts } = require("./modules/productsModule.js");
const { refreshCart, getCart, createCart, clearCart, initCarts } = require("./modules/cartsModule.js");
const { addOrder, getOrders } = require("./modules/ordersModule.js");

app.use(express.static("client"));
app.use(express.json());
initUsers();
initProducts();
initCarts();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "login.html"));
});

app.get("/api/categories", async (req, res) => {
  const companies = await uniqueValuesByKey("companyName");
  const categories = await uniqueValuesByKey("category");
  res.send({ data: [companies, categories] });
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email, password);
    console.log(user);
    return res.send({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await addUser(email, username, password);
    await createCart(username);
    return res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await getProducts();
    return res.send({ success: true, products });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await getOrders();
    return res.send({ success: true, orders });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

app.put("/api/refreshCart", async (req, res) => {
  try {
    const { products, username } = req.body;
    await refreshCart(products, username);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
});

app.post("/api/orderPaid", async (req, res) => {
  try {
    const { cart } = req.body;
    await addOrder(cart);
    await clearCart(cart.username);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
});

app.get("/api/getCart/:username", async (req, res) => {
  try {
    const username = req.params;
    console.log(username);
    const cart = await getCart(username.username);
    res.send({ success: true, cart });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
