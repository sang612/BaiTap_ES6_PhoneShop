let phoneList = [];
let cartList = [];

const fetchPhones = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });

    phoneList = mapPhones(res.data);
    renderPhones(phoneList);
  } catch (err) {
    console.log(err);
  }
};

const renderPhones = (data) => {
  let phoneListHTML = "";

  data.forEach((item, index) => {
    phoneListHTML += item.render();
  });

  document.getElementById("phoneList").innerHTML = phoneListHTML;
};

const mapPhones = (data) => {
  const results = data.map((item, i) => {
    return new Phone(
      item.name,
      item.price,
      item.screen,
      item.backCamera,
      item.frontCamera,
      item.img,
      item.desc,
      item.type,
      item.id,
      item.quantity
    );
  });

  return results;
};

const phoneByType = () => {
  let type = document.getElementById("phoneType").value;
  if (type == "all") {
    renderPhones(phoneList);
    return;
  }
  const results = phoneList.filter((item) => item.type == type);
  renderPhones(results);
};

const addToCart = (id) => {
  if (cartList.findIndex((item) => item.id == id) != -1) {
    index = cartList.findIndex((item) => item.id == id);
    cartList[index].quantity += 1;
    console.log(123);
    renderCart();
    checkQuantity();
    saveData();
    return;
  }
  const results = phoneList.find((item) => item.id == id);
  cartList.push({
    ...results,
    quantity: 1,
  });
  console.log(cartList);

  renderCart();
  checkQuantity();
  saveData();
};

const renderCart = () => {
  checkCartEmpty();
  cartHTML = "";
  cartList.forEach((item, index) => {
    cartHTML += ` 
    <tr>
      <td>
        <img src=${item.img} alt=${item.name} width="70px" height="50px"/>
      </td>
      <td>${item.name}</td>
      <td>${formatNumber(item.price)} VNĐ</td>
      <td>
        <button class="btn btn-primary" id="minus-btn-${
          item.id
        }" onclick="onChangeQuantity(${item.id}, -1)"  
        
        >-</button>
        ${item.quantity}
        <button class="btn btn-primary" onclick="onChangeQuantity(${
          item.id
        }, 1)">+</button>
      </td>
      <td>${formatNumber(item.price * item.quantity)} VNĐ</td>
      <td>
        <button class="btn btn-danger" onclick="deleteProduct(${
          item.id
        })">Xóa</button>
      </td>
    </tr>
    `;

    document.getElementById("cart-item").innerHTML = cartHTML;
    document.getElementById("total").innerHTML = formatNumber(total()) + " VNĐ";
  });
};

const onChangeQuantity = (id, value) => {
  index = cartList.findIndex((item) => item.id == id);
  if (value == -1) {
    cartList[index].quantity += -1;
  } else {
    cartList[index].quantity += 1;
  }

  renderCart();
  checkQuantity();
  saveData();
};

const checkQuantity = () => {
  cartList.forEach((item, index) => {
    if (item.quantity == 1) {
      document.getElementById("minus-btn-" + item.id).disabled = true;
    } else {
      document.getElementById("minus-btn-" + item.id).disabled = false;
    }
  });
};

const total = () => {
  sum = 0;
  cartList.forEach((item, index) => {
    sum += item.price * item.quantity;
  });

  return sum;
};

const clearCart = () => {
  cartList.length = 0;

  document.getElementById("cart-item").innerHTML = "";
  document.getElementById("total").innerHTML = "0$";
  saveData();
};

const deleteProduct = (id) => {
  index = cartList.findIndex((item) => item.id == id);
  cartList.splice(index, 1);
  renderCart();
  saveData();
};

const checkCartEmpty = () => {
  if (cartList.length == 0) {
    clearCart();
  }
};

const saveData = () => {
  let cartListJSON = JSON.stringify(cartList);
  localStorage.setItem("list", cartListJSON);
};

const getData = () => {
  let cartListJSON = localStorage.getItem("list");
  if (cartListJSON) {
    cartList = mapData(JSON.parse(cartListJSON));
    renderCart();
  }
};

const mapData = (dataFromLocal) => {
  let data = [];
  for (let item of dataFromLocal) {
    data.push(item);
  }

  return data;
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

getData();

fetchPhones();

checkQuantity();

document.getElementById("phoneType").addEventListener("change", phoneByType);
