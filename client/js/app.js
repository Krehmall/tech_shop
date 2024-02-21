function validRegisterInfo(email, userName, password, confirmPassword) {
  let valid = true;
  if (!email.includes("@") || userName === "" || password === "" || password.length < 3 || password !== confirmPassword) {
    valid = false;
  }
  return valid;
}
async function makeFetchRequest(url, method = "GET", body = null) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return response.json();
}

async function login(event) {
  try {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await makeFetchRequest("/api/login", "POST", {
      email,
      password,
    });
    if (!response.success) {
      alert(response.message);
      return;
    }
    const loggedInUser = response.user;
    storageService.setUser(loggedInUser);
    if (loggedInUser.isAdmin === true) {
      window.location.href = "/orders.html";
    } else {
      window.location.href = "/home.html";
    }
  } catch (error) {
    console.log(error);
  }
}

async function register(event) {
  try {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const valid = validRegisterInfo(email, username, password, confirmPassword);
    if (!valid) {
      alert("Something wrong with your inputs!!!");
      return;
    }
    const response = await makeFetchRequest("/api/register", "POST", {
      email,
      username,
      password,
    });
    if (!response.success) {
      alert(response.message);
      return;
    }
    window.location.href = "/login.html";
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

function logOut() {
  storageService.clearAll();
  window.location.href = "/login.html";
}
function moveCart() {
  window.location.href = "/cart.html";
}

function moveHome() {
  window.location.href = "/home.html";
}

function addToCart(id) {
  const productToAdd = storageService.getProducts().filter((item) => item._id === id);

  const cart = storageService.getCart();
  const isInCart = cart.productsInCart.filter((item) => item._id === id);
  if (isInCart.length === 0) {
    cart.productsInCart.push(productToAdd[0]);
    storageService.setCart(cart);
  } else {
    alert("The product is already in the shopping cart");
  }
  init();
}

function numProductInCart() {
  const cart = storageService.getCart();
  len = cart.productsInCart.length;
  return len;
}

function removeFromCart(id) {
  const cart = storageService.getCart();
  const newCart = cart.productsInCart.filter((item) => item._id !== id);
  cart.productsInCart = newCart;
  storageService.setCart(cart);
  renderCartList(cart);
}

function addSameProduct(id) {
  const cart = storageService.getCart();
  const updataCart = cart.productsInCart.filter((item) => item._id === id);
  console.log(updataCart[0]);
  console.log(cart);

  renderCartList(cart);
}

function totalPrice(cart) {
  const totalPrice = cart.productsInCart.reduce((acc, product) => {
    acc += product.price;
    return acc;
  }, 0);

  document.querySelector(".total_price").innerHTML = `Total Price  ${totalPrice}$`;
}

async function init() {
  const user = storageService.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  document.querySelector("#display_username").innerHTML = `Welcome  ${user.username}`;
  await filterBarsRender();
  let cart = storageService.getCart();
  if (!cart) {
    const response = await makeFetchRequest(`/api/getCart/${user.username}`);
    cart = response.cart;
    storageService.setCart(cart);
  }
  let products = storageService.getProducts();
  if (!products) {
    const response = await makeFetchRequest("/api/products");
    products = response.products;
    storageService.setProducts(products);
  }
  document.querySelector("#cart_btn").innerHTML = `Cart ${numProductInCart()}`;
  renderProductList(products);
}

async function cart_init() {
  let cart = storageService.getCart();
  if (!cart) {
    const response = await makeFetchRequest(`/api/getCart/${user.username}`);
    cart = response.cart.numProductInCart;
    storageService.setCart(cart);
  }
  renderCartList(cart);
}

///chackout

async function chackout() {
  const cart = storageService.getCart();
  await makeFetchRequest("/api/orderPaid", "POST", { cart });
}

//order list
// async function ordersListInit() {
// let cart = storageService.getCart();
// if (!cart) {
//   const response = await makeFetchRequest(`/api/getCart/${user.username}`);
//   cart = response.cart.numProductInCart;
//   storageService.setCart(cart);
// }
// renderCartList(cart);
// }

async function ordersListInit() {
  let order = storageService.getOrders();
  if (!order) {
    const response = await makeFetchRequest("/api/orders");
    console.log(response);
    order = response.orders;
    console.log(order);
    storageService.setOrders(order);
  }
  console.log(order);
}

ordersListInit();
