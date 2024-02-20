function validRegisterInfo(email, userName, password, confirmPassword) {
  let valid = true;
  if (
    !email.includes("@") ||
    userName === "" ||
    password === "" ||
    password.length < 3 ||
    password !== confirmPassword
  ) {
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

function addToCart() {}

async function init() {
  const user = storageService.getUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }
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
  renderProductList(products);
}

async function cart_init() {
  let cart = storageService.getCart();
  if (!cart) {
    const response = await makeFetchRequest(
      `/api/getCart?username=${user.username}`
    );
    cart = response.cart;
    storageService.setCart(cart);
  }
  renderCartList(cart);
}
