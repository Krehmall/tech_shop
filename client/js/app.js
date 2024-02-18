/*login*/

function validLoginInfo(email, password) {
  let valid = true;
  if (!email.includes("@")) {
    valid = false;
  } else if (password.length < 3) {
    valid = false;
  }

  return valid;
}

function validRegisterInfo(email, userName, password, confirmPassword) {
  let valid = true;
  if (!email.includes("@")) {
    valid = false;
  } else if (userName === "") {
    valid = false;
  } else if (password.length < 3 || password !== confirmPassword) {
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
  return response;
}

async function login(event) {
  try {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const valid = validLoginInfo(email, password);

    if (valid) {
      const response = await makeFetchRequest("/api/login", "POST", {
        email,
        password,
      });
      const data = await response.json();
      if (!data.success) {
        alert(data.message);
        return;
      }
      const loggedInUser = data.user;
      storageService.setUser(loggedInUser);
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
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    const valid = validRegisterInfo(email, username, password, confirmPassword);

    if (valid) {
      const response = await makeFetchRequest("/api/register", "POST", {
        email,
        username,
        password,
      });
      const data = await response.json();
      if (!data.success) {
        alert(data.message);
        return;
      }
      const loggedInUser = data.user;
      storageService.setUser(loggedInUser);
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
function logOut() {
  storageService.clearAll();
  window.location.href = "/login.html";
}

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

async function renderHomeProducts() {
  const response = await makeFetchRequest("/api/products");
  const data = await response.json();
  console.log(data.products);
}
