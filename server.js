const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const path = require("path");
const { addUser, getUserByEmail } = require("./modules/usersModule.js");
const { getProductById, getProducts, updateProductStockBy, uniqueValuesByKey } = require("./modules/productsModule.js");
const { addProductToCart, removeProductFromCart, getCart, createCart, clearCart } = require("./modules/cartsModule.js");

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
    const queryStringParam = req.query;
    console.log(queryStringParam);
    const products = await getProducts();
    return res.send({ success: true, products });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

// app.get("/api/product", async (req, res) => {
//   try {
//     const queryStringParam = req.query;
//     console.log(queryStringParam);
//     const product = await getProductById(id);
//     return res.send({ success: true, product });
//   } catch (error) {
//     return res.status(400).send({ success: false, message: error.message });
//   }
// });

// app.put("/api/addToCart", async (req, res) => {
//   try {
//     const { product, username } = req.body;
//     await addProductToCart(product, username);
//     res.send({ success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({ success: false, message: error.message });
//   }
// });
// app.delete("/api/removeFromCart", async (req, res) => {
//   try {
//     const { product, username } = req.body;
//     await removeProductFromCart(product, username);
//     res.send({ success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({ success: false, message: error.message });
//   }
// });
app.delete("/api/orderPaid", async (req, res) => {
  try {
    const { username } = req.body;
    await clearCart(username);
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
