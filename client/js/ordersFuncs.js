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
  const htmlProducts = order.productsInCart.map((item) => {
    return orderData(item.urlPic, item.name, item.items);
  });
  if (document.getElementById(order._id).innerHTML === "") {
    document.getElementById(order._id).innerHTML = htmlProducts.join("");
  } else {
    document.getElementById(order._id).innerHTML = "";
  }
}

function showOrderProduct(username) {
  let orders = storageService.getOrders();
  const curentOrder = orders.find((item) => item.username === username);
  renderOrderList(curentOrder);
}
//--------------------------------------------------------

function userData(username, id) {
  let userItem = `<div class="users_orders">
    <div>
    <p>Username: ${username}</p>
    </div>
    <div>
    <button onclick="showOrderProduct('${username}')">Show products</button>
    </div>
    <div id="${id}" name ="Closed"></div>
    </div>`;

  return userItem;
}

function renderOrderByUserList(order) {
  const htmlProducts = order.map((item) => {
    return userData(item.username, item._id);
  });
  document.querySelector("#order_list").innerHTML = htmlProducts.join("");
}
