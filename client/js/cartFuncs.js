async function checkout() {
  const cart = storageService.getCart();
  await makeFetchRequest("/api/orderPaid", "POST", { cart });
}

function totalPrice(cart) {
  const totalPrice = cart.productsInCart.reduce((acc, product) => {
    acc += product.price;
    return acc;
  }, 0);

  document.querySelector(".total_price").innerHTML = `Total Price  ${totalPrice}$`;
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
  <button>-</button>
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
    //----------------------------------------------
    // if (item.items === undefined) {
    //   item.items = 1;
    // }
    //----------------------------------------------
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
  const updataCart = cart.productsInCart.filter((item) => item._id === id);
  console.log(updataCart[0]);
  console.log(cart);
  renderCartList(cart);
}

function addToCart(id) {
  const productToAdd = storageService.getProducts().find((item) => item._id === id);
  const cart = storageService.getCart();
  const isInCart = cart.productsInCart.find((item) => item._id === id);
  if (isInCart) {
    const index = cart.productsInCart.indexOf(isInCart);
    cart.productsInCart[index].items++;
  } else {
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
