/*login*/

function validLoginInfo(username, password) {
  let valid = true;
  if (!username.includes("@")) {
    valid = false;
  } else if (password.length < 3) {
    valid = false;
  }

  return valid;
}

async function login(event) {
  try {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const valid = validLoginInfo(username, password);

    if (valid) {
      window.location.href = "/home.html";
    } else {
      alert("Sunthing wrong with your informtion");
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

/*register*/
async function register(event) {
  try {
    event.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const valid = validLoginInfo(username, password);

    if (valid) {
      window.location.href = "/login.html";
    } else {
      alert("Sunthing wrong with your informtion");
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

/*nav*/

function sort(event) {
  alert("click");
}

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

//render data
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
      colorTxt
    );
  });

  document.querySelector("#products_list").innerHTML = htmlProducts.join("");
}
