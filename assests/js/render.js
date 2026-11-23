"use strict";

const formatNumbers = function (num) {
  const decimal = 2;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
};

const renderRouter = function (hash, sections) {
  sections.forEach((section) => {
    section.id === hash
      ? section.classList.remove("hidden")
      : section.classList.add("hidden");
  });
};

const buildProductItem = function (product) {
  const divCard = document.createElement("a");
  divCard.href = `#productSection/${product.id}`;
  divCard.className = "card rounded-5 col-4";

  const divImg = document.createElement("div");
  divImg.className = "h-50 w-50";
  divCard.appendChild(divImg);

  const img = document.createElement("img");
  img.src = product.img;
  img.className = "card-img-top card-img";
  img.alt = "name";
  divImg.appendChild(img);

  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";
  divCard.appendChild(divCardBody);

  const title = document.createElement("h4");
  title.className = "card-title";
  title.textContent = product.name;
  divCardBody.appendChild(title);

  const disc = document.createElement("p");
  disc.textContent = `$${formatNumbers(product.price)}`;
  divCardBody.appendChild(disc);

  const btn = document.createElement("button");
  btn.className = "btn btn-dark";
  btn.dataset.addId = product.id;
  btn.id = "addToCart";
  btn.textContent = "Add to Cart";
  divCardBody.appendChild(btn);

  if (product.stock === 0) {
    const divBadge = document.createElement("div");
    divBadge.className = "badge bg-danger";

    const badge = document.createElement("p");
    badge.className = "m-0";
    badge.textContent = "Out of Stock";
    divBadge.appendChild(badge);
    divCard.prepend(divBadge);

    divCard.className = "card rounded-5 col-4 not-avalibal";

    btn.disabled = true;
  }

  return divCard;
};

const render = function (products) {
  grid.innerHTML = "";

  if (products.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No product matching";
  }

  for (const product of products) {
    const productElement = buildProductItem(product);
    grid.appendChild(productElement);
  }
};

const renderCategorysName = function (options) {
  category.innerHTML = "";

  for (const option of options) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    category.appendChild(optionElement);
  }
};

const renderRestFilters = function (
  search,
  category,
  checkbox,
  minPrice,
  maxPtice,
) {
  search.value = "";
  category.options[0].selected = true;
  checkbox.checked = false;
  minPrice.value = "";
  maxPtice.value = "";
};

const renderCartBadge = function (total) {
  cartBadge.textContent = total.count;
};

const buildCartItem = function (item, product) {
  const li = document.createElement("li");
  li.dataset.is = item.id;
  li.id = "cartItem";

  const divCart = document.createElement("div");
  divCart.className = "cart-detail";
  li.appendChild(divCart);

  const itemName = document.createElement("p");
  itemName.className = "cart-item-name m-0";
  itemName.textContent = product.name;
  divCart.appendChild(itemName);

  const itemPrice = document.createElement("p");
  itemPrice.className = "cart-item-price";
  itemPrice.textContent = `$${formatNumbers(product.price)}`;
  divCart.appendChild(itemPrice);

  const divCartActions = document.createElement("div");
  divCartActions.className = "cart-detail";
  li.append(divCartActions);

  const div = document.createElement("div");
  div.className = "d-flex align-items-center gap-1";
  divCartActions.appendChild(div);

  const btnIncremet = document.createElement("button");
  btnIncremet.className = "btn";
  btnIncremet.dataset.id = item.id;
  btnIncremet.disabled = item.qty >= product.stock ? true : false;
  btnIncremet.dataset.action = "incremet";
  btnIncremet.textContent = "+";
  div.appendChild(btnIncremet);

  const itemQty = document.createElement("p");
  itemQty.className = "cart-item-qty m-0";
  itemQty.textContent = `x${item.qty}`;
  div.appendChild(itemQty);

  const btnDecremet = document.createElement("button");
  btnDecremet.className = "btn";
  btnDecremet.dataset.id = item.id;
  btnDecremet.disabled = item.qty === 1 ? true : false;
  btnDecremet.dataset.action = "decremet";
  btnDecremet.textContent = "-";
  div.appendChild(btnDecremet);

  const btnRemove = document.createElement("button");
  btnRemove.className = "btn";
  btnRemove.dataset.id = item.id;
  btnRemove.dataset.action = "remove";
  btnRemove.textContent = "remove";
  div.appendChild(btnRemove);

  const itemTotalPrice = document.createElement("p");
  itemTotalPrice.className = "cart-item-total-price";
  itemTotalPrice.textContent = `$${formatNumbers(item.qty * product.price)}`;
  divCartActions.appendChild(itemTotalPrice);

  return li;
};

const renderCart = function (cart, products) {
  cartItems.innerHTML = "";

  for (const item of cart) {
    const product = products.find((element) => element.id === item.id);
    if (!product) {
      continue;
    }
    const productItem = buildCartItem(item, product);
    cartItems.appendChild(productItem);
  }

  if (cartItems.children.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No item in the cart";
    cartItems.appendChild(p);
  }
};

const renderCartTotal = function (total) {
  subTotal.textContent = `subTotal: $${formatNumbers(total.subTotal)}`;
  count.textContent = `count: ${total.count}`;
  clearCartBtn.className = total.count === 0 ? "hidden" : "btn btn-dark";
};

const updateCaetUI = function (cart, products, total) {
  renderCartBadge(total);
  renderCart(cart, products);
  renderCartTotal(total);
};

export {
  render,
  renderCategorysName,
  renderRestFilters,
  updateCaetUI,
  renderRouter,
};
