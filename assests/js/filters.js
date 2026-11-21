"use strict";

const defindeCategorys = function (arr) {
  let category = ["all"];
  for (let i = 0; i < arr.length; i++) {
    if (!category.includes(arr[i].category)) {
      category.push(arr[i].category);
    }
  }
  return category;
};

const filter = function (arr, filterSettings) {
  let productsAfterFiltering = [];

  productsAfterFiltering = [...catagorySet(arr, filterSettings.category)];

  if (filterSettings.onlyInStock) {
    productsAfterFiltering = stockSet(productsAfterFiltering);
  }

  productsAfterFiltering = priceSet(
    productsAfterFiltering,
    filterSettings.minPrice,
    filterSettings.maxPrice,
  );

  productsAfterFiltering = saerchSet(
    productsAfterFiltering,
    filterSettings.search,
  );

  resultsCount.textContent = `${productsAfterFiltering.length} of ${arr.length}`;
  return productsAfterFiltering;
};

const saerchSet = function (arr, searchText) {
  let productsAfterFiltering = [];
  for (let i = 0; i < arr.length; i++) {
    let index = arr[i].name.toLowerCase().indexOf(searchText.toLowerCase());
    if (index !== -1) {
      productsAfterFiltering.push(arr[i]);
    }
  }
  return productsAfterFiltering;
};

const catagorySet = function (arr, option) {
  if (option === "all") {
    return arr;
  } else {
    let productsAfterFiltering = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].category === option) {
        productsAfterFiltering.push(arr[i]);
      }
    }
    return productsAfterFiltering;
  }
};

const stockSet = function (arr) {
  let productsAfterFiltering = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].stock) {
      productsAfterFiltering.push(arr[i]);
    }
  }
  return productsAfterFiltering;
};

const priceSet = function (arr, min, max) {
  let productsAfterFiltering = [];
  let minPrice = arr[0].price;
  let maxPrice = arr[0].price;
  for (let i = 0; i < arr.length; i++) {
    if (minPrice > arr[i].price) {
      minPrice = arr[i].price;
    } else if (maxPrice < arr[i].price) {
      maxPrice = arr[i].price;
    }
  }

  if (max === "") {
    for (let i = 0; i < arr.length; i++) {
      if (min <= arr[i].price) {
        productsAfterFiltering.push(arr[i]);
      }
    }
    return productsAfterFiltering;
  } else if (min === "") {
    for (let i = 0; i < arr.length; i++) {
      if (max >= arr[i].price) {
        productsAfterFiltering.push(arr[i]);
      }
    }
    return productsAfterFiltering;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (min <= arr[i].price && max >= arr[i].price) {
        productsAfterFiltering.push(arr[i]);
      }
    }
    return productsAfterFiltering;
  }
};

const resetFilters = function (arr) {
  arr = {
    search: "",
    category: "all",
    onlyInStock: false,
    minPrice: 0,
    maxPrice: Infinity,
  };

  return arr;
};

export { defindeCategorys, resetFilters, filter };
