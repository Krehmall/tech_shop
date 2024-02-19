async function filterBarsRender() {
  const response = await makeFetchRequest("/api/categories");
  const [companies, categories] = response.data;
  categories.unshift("All");
  const htmlCategories = categories.map((value) => {
    return `<option value="${value}">${value}</option>`;
  });
  document.querySelector("#categories").innerHTML = htmlCategories.join("");
  companies.unshift("All");
  const htmlCompanies = companies.map((value) => {
    return `<option value="${value}">${value}</option>`;
  });
  document.querySelector("#companies").innerHTML = htmlCompanies.join("");
}

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

function refreshProducts(event) {
  const products = storageService.getProducts();
  renderProductList(products);
}

function sort(products) {
  const sortBy = document.querySelector("#sort").value;
  const result = products.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0));
  return result;
}

function filterByAvailability(products) {
  const status = document.querySelector("#availability").value;
  let result = products;
  if (status === "Not_Availbale") {
    result = products.filter((item) => item.isAvailable === false);
  } else if (status === "Availbale") {
    result = products.filter((item) => item.isAvailable === true);
  }
  return result;
}

function filterBySearch(products) {
  const word = document.querySelector("#search").value;
  const result = products.filter((item) => item.name.includes(word));
  return result;
}

function filterByCategory(products) {
  const category = document.querySelector("#categories").value;
  let result = products;
  if (category !== "All") {
    result = products.filter((item) => item.category === category);
  }
  return result;
}

function filterByCompany(products) {
  const companyName = document.querySelector("#companies").value;
  let result = products;
  if (companyName !== "All") {
    result = products.filter((item) => item.companyName === companyName);
  }
  return result;
}

function renderProductList(products) {
  const filteredByCategory = filterByCategory(products);
  const filteredByCompany = filterByCompany(filteredByCategory);
  const filteredByAvailability = filterByAvailability(filteredByCompany);
  const filteredProducts = filterBySearch(filteredByAvailability);
  const sortedAndFilteredProducts = sort(filteredProducts);
  const htmlProducts = sortedAndFilteredProducts.map((item) => {
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
