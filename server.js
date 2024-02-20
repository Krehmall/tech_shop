const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require("path");
const { addUser, getUserByEmail } = require("./modules/usersModule.js");
const { getProducts, uniqueValuesByKey } = require("./modules/productsModule.js");
const { refreshCart, getCart, createCart, clearCart } = require("./modules/cartsModule.js");
const { addOrder, getOrders } = require("./modules/ordersModule.js");

app.use(express.static("client"));
app.use(express.json());

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
    // const queryStringParam = req.query;
    // console.log(queryStringParam);
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

// addUser("or0548096690@gmail.com", "username", "password")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// var objs = [
//   { first_nom: "Laszlo", last_nom: "Jamf" },
//   { first_nom: "Pig", last_nom: "Bodine" },
//   { first_nom: "Pirate", last_nom: "Prentice" },
// ];
// objs.sort((a, b) => (a.last_nom > b.last_nom ? 1 : b.last_nom > a.last_nom ? -1 : 0));
// console.log(objs);
