"use strict";
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  const salt = 10;
  const currentHash = await bcrypt.hash(password, salt);
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
