"use strict";

import { state } from "./states.js";
import { products } from "./data.js";
import {
  render,
  renderCategorysName,
  renderRestFilters,
  updateCaetUI,
  renderRouter,
} from "./render.js";
import { defindeCategorys, resetFilters, filter } from "./filters.js";
import {
  handleClearCart,
  handleAddClick,
  handleCartClick,
  compactTotals,
  loadCart,
} from "./cart.js";

import { handelHashChange } from "./router.js";

const homeSection = document.querySelector("#homeSection");
const cartSection = document.querySelector("#cartSection");
const productSection = document.querySelector("#productSection");
const grid = document.querySelector("#grid");
const cartBadge = document.querySelector("#cartBadge");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const resultsCount = document.querySelector("#resultsCount");
const checkBox = document.querySelector("#inStockOnly");
const priceFilterSumbitBtn = document.querySelector("#priceFilterSumbitBtn");
const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
const resetBtn = document.querySelector("#resetBtn");
const cartItems = document.querySelector("#cartItems");
const subTotal = document.querySelector("#subTotal");
const count = document.querySelector("#count");
const clearCartBtn = document.querySelector("#clearCartBtn");
const productImg = document.querySelector("#productImg");
const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");

// init

const router = function (hash) {
  if (!hash) return;

  const sections = [homeSection, cartSection, productSection];
  const page = handelHashChange(hash);
  if (!page) return;

  if (Number(page)) {
    const exsting = products.find((item) => item.id === page);
    if (!exsting) return;
    productImg.src = exsting.img;
    productName.textContent = exsting.name;
    productPrice.textContent = `$${exsting.price}`;
    renderRouter(sections[2].id, sections);
    return;
  }

  renderRouter(page, sections);
};

router(window.location.hash);
render(filter(products, state.filterSettings));
renderCategorysName(defindeCategorys(products));

window.addEventListener("hashchange", () => {
  router(window.location.hash);
});

// filters

search.addEventListener("keyup", (e) => {
  state.filterSettings.search = e.target.value;
  render(filter(products, state.filterSettings));
});

category.addEventListener("change", function () {
  state.filterSettings.category = this.value;
  render(filter(products, state.filterSettings));
});

checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    state.filterSettings.onlyInStock = true;
    render(filter(products, state.filterSettings));
  } else {
    state.filterSettings.onlyInStock = false;
    render(filter(products, state.filterSettings));
  }
});

priceFilterSumbitBtn.addEventListener("click", () => {
  state.filterSettings.minPrice = minPriceInput.value;
  state.filterSettings.maxPrice = maxPriceInput.value;
  render(filter(products, state.filterSettings));
});

resetBtn.addEventListener("click", () => {
  state.filterSettings = resetFilters(state.filterSettings);
  render(filter(products, state.filterSettings));
  renderRestFilters(search, category, checkBox, minPriceInput, maxPriceInput);
});

// cart

state.cart = loadCart();
updateCaetUI(state.cart, products, compactTotals(products));

document.addEventListener("cart:chanched", () => {
  updateCaetUI(state.cart, products, compactTotals(products));
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add-id]");
  if (!btn) return;
  handleAddClick(products, Number(btn.dataset.addId));
});

cartItems.addEventListener("click", (e) => {
  const event = e.target.closest("[data-action]");
  const product = e.target.closest("[data-id]");

  if (!event) return;
  handleCartClick(event.dataset.action, Number(product.dataset.id));
});

clearCartBtn.addEventListener("click", () => {
  handleClearCart();
});
