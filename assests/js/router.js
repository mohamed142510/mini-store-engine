"use strict";

const avalibalHashs = ["home", "cart", "product"];
const defulteHash = avalibalHashs[0];

const getRouter = function (cc) {
  const hash = cc;
  const clean = hash.replace("#", "");
  const productHash = clean.split("/");

  // if (clean === avalibalHashs[2])
  for (const hash of avalibalHashs) {
    if (hash === clean) return clean;
  }

  return defulteHash;
};

export { getRouter };
