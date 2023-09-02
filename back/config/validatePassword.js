const bcrypt = require("bcrypt");

const validatePassword = function (user, password) {
  console.log(user, password);
  return bcrypt
    .hash(password, user.salt)
    .then((hashed) => user.password === hashed);
};

module.exports = { validatePassword };
