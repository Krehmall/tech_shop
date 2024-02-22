async function checkout() {
  const cart = storageService.getCart();
  if (totalPrice(cart) === 0) {
    alert("There is no items in cart to buy!!!");
  } else {
    storageService.clearCart();
    await makeFetchRequest("/api/orderPaid", "POST", { cart });
    alert("The order has been paid");
    window.location.href = "/home.html";
  }
}

function totalPrice(cart) {
  const totalPrice = cart.productsInCart.reduce((acc, product) => {
    acc += product.price * product.items;
    return acc;
  }, 0);
  document.querySelector(".total_price").innerHTML = `Total Price  ${totalPrice}$`;
  return totalPrice;
}
function cartData(img, pName, price, items, id) {
  let cartItem = `
  <div class="cart">
  <div>
  <img class="img_cart" src="${img}">
  </div>
  <div class="cart_list_info>
  <p class="c_name">${pName}</p>
  </div>
  <div class="cart_list_with_btns">
  <button onclick="lessSameProduct('${id}')">-</button>
  <p class="c_items">${items}</p>
  <button onclick="addSameProduct('${id}')" >+</button>
  <p class="c_price">${price}$</p>
  <button onclick="removeFromCart('${id}')">Remove</button>
  </div>
  </div>
  `;
  return cartItem;
}
function renderCartList(cart) {
  const htmlProducts = cart.productsInCart.map((item) => {
    return cartData(item.urlPic, item.name, item.price, item.items, item._id);
  });
  document.querySelector("#cart_list").innerHTML = htmlProducts.join("");
  totalPrice(cart);
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
  const item = cart.productsInCart.find((item) => item._id === id);
  const index = cart.productsInCart.indexOf(item);
  cart.productsInCart[index].items++;
  storageService.setCart(cart);
  renderCartList(cart);
}

function lessSameProduct(id) {
  const cart = storageService.getCart();
  const item = cart.productsInCart.find((item) => item._id === id);
  const index = cart.productsInCart.indexOf(item);
  cart.productsInCart[index].items--;
  if (cart.productsInCart[index].items === 0) {
    removeFromCart(id);
  } else {
    storageService.setCart(cart);
    renderCartList(cart);
  }
}

function addToCart(id) {
  const cart = storageService.getCart();
  const isInCart = cart.productsInCart.find((item) => item._id === id);
  if (isInCart) {
    const index = cart.productsInCart.indexOf(isInCart);
    cart.productsInCart[index].items++;
  } else {
    const productToAdd = storageService.getProducts().find((item) => item._id === id);
    productToAdd.items = 1;
    cart.productsInCart.push(productToAdd);
  }
  storageService.setCart(cart);
  totalItemsInCartRender(cart);
  alert("The product has been added to shopping cart");
}

function totalItemsInCartRender(cart) {
  const totalItemsInCart = cart.productsInCart.reduce((acc, product) => {
    acc += product.items;
    return acc;
  }, 0);
  document.querySelector("#cart_btn").innerHTML = `Cart (${totalItemsInCart} Items)`;
}
