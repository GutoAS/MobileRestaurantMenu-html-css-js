import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const orders = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.plus) {
    handlePlusButtonClick(e.target.dataset.plus);
  }
  if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  }
});

function handlePlusButtonClick(id) {
  const exactItem = menuArray.find((item) => item.id == id);
  orders.push({
    id: uuidv4(),
    name: exactItem.name,
    price: exactItem.price,
  });
  document.getElementById("orderListEl").classList.remove("display-none");
  render();
}

function handleRemoveClick(id) {
  const exactOrder = orders.find((order) => order.id == id);
  const index = orders.indexOf(exactOrder);
  orders.splice(index, 1);
  if (orders.length === 0) {
    document.getElementById("orderListEl").classList.add("display-none");
  }
  render();
}

function getMenuItems() {
  let items = "";
  menuArray.forEach((item) => {
    items += `
    <div class="items-list">
          <div class="item-emoji">${item.emoji}</div>
          <div class="item-description">
            <h2>${item.name}</h2>
            <p class="item-ingredients">${item.ingredients.join(", ")}
            </p>
            <p>$${item.price}</p>
          </div>
          <div class="rounded-plus"><i class="fa-regular fa-plus" data-plus="${
            item.id
          }"></i></div>
    </div>  
    `;
  });
  return items;
}

function getOrders() {
  let orderHtml = "";
  orders.forEach((order) => {
    orderHtml += `
        <div class="order-item">
        <p class="order-name">${order.name}</p>
        <p class="order-remove" data-remove="${order.id}">remove</p>
        <p class="order-price">$${order.price}</p>
      </div>
        `;
  });
  return orderHtml;
}

function render() {
  document.getElementById("itemsEl").innerHTML = getMenuItems();
  document.getElementById("ordersItemsEl").innerHTML = getOrders();
}

render();
