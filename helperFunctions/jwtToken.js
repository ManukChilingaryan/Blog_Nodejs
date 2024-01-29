"use strict";
const jwt = require("jsonwebtoken");    
const SECRET_KEY = "a920060f337ed0142822f11445676b0d37428dc67e8335da234ee6a0dad37e74f1ad94df78f4411e7306333ab2ba12f55e2d363c8a13c7b9ce71f84b9040b04a";

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

function decodeToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      return null;
    }
  }

module.exports = { createToken, verifyToken, decodeToken };
