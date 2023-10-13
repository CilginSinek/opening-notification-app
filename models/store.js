const { readFileSync, writeFileSync } = require("node:fs");
const path = require("path");

const storePath = path.join(__dirname, "store.json");

const DosyayiOku = () => {
  return JSON.parse(readFileSync(storePath));
};

exports.setData = (key, value) => {
  const storeObj = DosyayiOku();
  storeObj[key] = value;
  const newStoreObj = JSON.stringify(storeObj);
  writeFileSync(storePath, newStoreObj);
};

exports.getData = (key) => {
  const storeObj = DosyayiOku();
  return storeObj[key];
};
