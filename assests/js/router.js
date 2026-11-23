"use strict";

const avalibalHashs = ["homeSection", "cartSection", "productSection"];
const defulteHash = avalibalHashs[0];

const handelHashChange = function (hash) {
  if (!hash) return;
  const clean = hash.replace("#", "");
  const productHash = clean.split("/");

  if (productHash.length > 1) {
    if (!handleProductHash(productHash)) {
      return hashs(clean);
    }
    return handleProductHash(productHash);
  } else {
    return hashs(clean);
  }
};

const hashs = function (hash) {
  for (const avalibalhash of avalibalHashs) {
    if (avalibalhash === hash && avalibalhash !== avalibalHashs[2]) {
      return hash;
    }
  }
  return defulteHash;
};

const handleProductHash = function (hashArr) {
  if (
    !Number(hashArr[1]) ||
    hashArr[0] !== avalibalHashs[2] ||
    hashArr.length > 2
  ) {
    return false;
  }
  return Number(hashArr[1]);
};

export { handelHashChange };
