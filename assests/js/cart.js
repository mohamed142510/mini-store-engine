"use strict";

import { state } from "./states.js";

const commit = function () {
  saveCart(state.cart);
  document.dispatchEvent(new CustomEvent("cart:chanched"));
};

const handleAddClick = function (products, id) {
  const product = products.find((item) => item.id === id);
  const cartItem = state.cart.find((item) => item.id === id);

  if (!product || product.stock === 0) return;
  if (cartItem && product.stock <= cartItem.qty) return;

  state.cart = addToCart(id);

  commit();
};

const handleCartClick = function (event, id) {
  if (event === "incremet") {
    state.cart = addToCart(id);
  } else if (event === "decremet") {
    state.cart = decremetFromCart(id);
  } else if (event === "remove") {
    state.cart = removeFormCart(id);
  }

  commit();
};

const handleClearCart = function () {
  const confirm = window.confirm("Do you shur about clear the cart ?");

  if (confirm) state.cart = [];

  commit();
};

const addToCart = function (id) {
  const exsting = state.cart.find((item) => item.id === id);

  if (exsting) {
    return state.cart.map((item) =>
      item.id === exsting.id ? { ...item, qty: item.qty + 1 } : item,
    );
  }

  return [...state.cart, { id, qty: 1 }];
};

const decremetFromCart = function (id) {
  const exsting = state.cart.find((item) => item.id === id);

  if (!exsting || exsting.qty <= 1) return;

  if (exsting) {
    return state.cart.map((item) =>
      item.id === exsting.id ? { ...item, qty: item.qty - 1 } : item,
    );
  }

  return;
};

const removeFormCart = function (id) {
  const newCart = [...state.cart];

  for (let i = 0; i < newCart.length; i++) {
    if (id === newCart[i].id) {
      newCart.splice([i], [1]);
      return newCart;
    }
  }
};

const compactTotals = function (products) {
  let subTotal = [];
  let count = 0;

  for (const item of state.cart) {
    const exsting = products.find((element) => item.id === element.id);
    if (!exsting) continue;
    subTotal.push(exsting.price * item.qty);
    count += item.qty;
  }

  subTotal = subTotal.reduce((acc, cur) => acc + cur, 0);

  return { subTotal, count };
};

const saveCart = function (cart) {
  localStorage.setItem("cartData", JSON.stringify(cart));
};

const loadCart = function () {
  let cart = localStorage.getItem("cartData");
  if (cart !== null) {
    try {
      cart = JSON.parse(cart);
      return cart;
    } catch (error) {
      localStorage.removeItem("cartData");
      return [];
    }
  }
  return [];
};

export {
  handleClearCart,
  handleAddClick,
  handleCartClick,
  compactTotals,
  loadCart,
};

// test data
/*

const products = [
  { id: 3, price: 50 },
  { id: 7, price: 20 },
];

const c0 = [];
const c1 = addToCart(3);
const c2 = addToCart(3);
const c3 = addToCart(7);

console.log("c0 =", c0);
console.log("c1 =", c1);
console.log("c2 =", c2);
console.log("c3 =", c3);

console.log("1:", compactTotals([], products));
console.log("2:", compactTotals([{ id: 3, qty: 2 }], products));
console.log(
  "3:",
  compactTotals(
    [
      { id: 3, qty: 2 },
      { id: 7, qty: 1 },
    ],
    products,
  ),
);
console.log("4:", compactTotals([{ id: 999, qty: 5 }], products));
console.log(
  "5:",
  compactTotals(
    [
      { id: 3, qty: 2 },
      { id: 999, qty: 5 },
    ],
    products,
  ),
);
*/
