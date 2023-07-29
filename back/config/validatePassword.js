const bcrypt = require("bcrypt");

const validatePassword = function (user, password) {
  console.log(user, password);
  return bcrypt
    .hash(password, user[0].salt)
    .then((hashed) => user[0].password === hashed);
};

module.exports = { validatePassword };
