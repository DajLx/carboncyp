const token = require("jsonwebtoken");
const secret = "salsa de mayonesa";

const generateToken = (payload) => {
  const tokenCreated = token.sign({ user: payload }, secret, {
    expiresIn: "2d",
  });
  return tokenCreated;
};

const validateToken = (token) => token.verify(token, secret);

module.exports = { generateToken, validateToken };
