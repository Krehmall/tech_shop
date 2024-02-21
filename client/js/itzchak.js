async function ordersListInit() {
  let order = storageService.getOrders();
  if (!order) {
    const response = await makeFetchRequest("/api/orders");
    order = response.orders;
    storageService.setOrders(order);
  }
  renderOrderByUserList(order);
}

//order rendr
// template for render order products
function orderData(img, pName, items) {
  let orderItem = `
    <div class="cart">
    <div>
    <img class="img_cart" src="${img}">
    </div>
    <div class="cart_list_info>
    <p class="c_name">${pName}</p>
    <p class="c_name">Items: ${items}</p>
    </div>
    </div>
    `;
  return orderItem;
}

function renderOrderList(order) {
  const htmlProducts = order[0].productsInCart.map((item) => {
    return orderData(item.urlPic, item.name, item.items);
  });

  document.querySelector("#userProductsDiv").innerHTML = htmlProducts.join("");
}

//--------------------------------------------------------

function userData(username) {
  let userItem = `<div class="users_orders">
    <div>
    <p>Username: ${username}</p>
    </div>
    <div>
    <button onclick="showOrderProduct('${username}')">show products</button>
    </div>
    <div id="userProductsDiv"></div>
    </div>`;

  return userItem;
}

function renderOrderByUserList(order) {
  const htmlProducts = order.map((item) => {
    return userData(item.username);
  });

  document.querySelector("#order_list").innerHTML = htmlProducts.join("");
}

//-----------------------------------------------

async function showOrderProduct(username) {
  let order = storageService.getOrders();
  if (!order) {
    const response = await makeFetchRequest("/api/orders");
    order = response.orders;
    storageService.setOrders(order);
  }
  const curntOrder = order.filter((item) => item.username === username);
  renderOrderList(curntOrder);
}
//-----------------------------------------------------------------------
async function makeFetchRequest(url, method = "GET", body = null) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return response.json();
}
