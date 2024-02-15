let product_items = [
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: false,
    catagory: "laptop",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: true,
    catagory: "laptop",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: true,
    catagory: "laptop",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: true,
    catagory: "pc",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: false,
    catagory: "pc",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: true,
    catagory: "tablet",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: true,
    catagory: "tablet",
  },
  {
    img: "https://images.macrumors.com/t/_EPm6PqSKDlwtf6slCMB3EaTjzY=/1600x0/article-new/2022/09/macbook-pro-purple.jpg",
    name: "apple",
    description: "mackbok pro 2024",
    price: 12000,
    inStoc: true,
    catagory: "smartphone",
  },
];

//templte to product data
function productsData(img, pName, description, price, inStoc, txtColor) {
  let productItem = `
    <div class="product">
    <img src="${img}">
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
    if (item.inStoc === true) {
      inStoc = "in stok";
      colorTxt = "txt_green";
    } else {
      inStoc = "out of stock";
      colorTxt = "txt_red";
    }

    return productsData(
      item.img,
      item.name,
      item.description,
      item.price,
      inStoc,
      colorTxt,
      item.catagory
    );
  });

  document.querySelector("#products_list").innerHTML = htmlProducts.join("");
}

renderProductList(product_items);

function sort(event) {
  const choice = event.target.value;
  console.log(choice);
}
