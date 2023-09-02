const jwt = require("jsonwebtoken");
const secret = "salsa de mayonesa";

const generateToken = (payload) => {
  const tokenCreated = jwt.sign({ user: payload }, secret, {
    expiresIn: "2d",
  });
  return tokenCreated;
};

const validateToken = (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  const user = jwt.verify(token, secret);
  if (!user) return res.sendStatus(401);
  req.user = user;
  next();
};

module.exports = { generateToken, validateToken };
