function productsData(img, pName, description, price, inStoc, txtColor) {
  let productItem = `
    <div class="product">
    <img class="img_product" src="${img}">
    <p class="p_name">${pName}</p>
    <P class="p_description">${description}</P>
    <p class=${txtColor}>${inStoc}</p>
    <p class="p_price">${price}$</p>
    <button class="btn_product">Add to cart</button>
    </div>
    `;
  return productItem;
}

function renderProductList(products) {
  const htmlProducts = products.map((item) => {
    let inStoc = "";
    let colorTxt = "";
    if (item.isAvailable === true) {
      inStoc = "in stok";
      colorTxt = "txt_green";
    } else {
      inStoc = "out of stock";
      colorTxt = "txt_red";
    }
    return productsData(item.urlPic, item.name, item.description, item.price, inStoc, colorTxt, item.catagory);
  });

  document.querySelector("#products_list").innerHTML = htmlProducts.join("");
}
