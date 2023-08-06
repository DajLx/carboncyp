const router = require("express").Router();
const User = require("../schemas/users");
const bcrypt = require("bcrypt");
const { validatePassword } = require("../config/validatePassword");
const { generateToken, validateToken } = require("../config/token");
router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const userToCreate = {
    name,
    lastname,
    email,
    password,
    salt: bcrypt.genSaltSync(2),
  };
  const hashed = await bcrypt.hash(userToCreate.password, userToCreate.salt);
  userToCreate.password = hashed;
  User.create(userToCreate)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email: email });
  console.log(user);
  const payload = {
    name: user.name,
    lastname: user.lastname,
    id: user.id,
    email: user.email,
  };
  const validator = await validatePassword(user, password);
  if (!validator) return res.sendStatus(401);
  const token = generateToken(payload);
  res.send({ token, payload });
});
router.post("/me", validateToken, (req, res) => {
  res.send(req.user)
})

router.get("/allUsers", async (req, res) => {
  const allUser = JSON.stringify(await User.find({}));
  res.send(allUser);
});

router.delete("/delete", async (req, res) => {
  await User.deleteMany({});
  const users = JSON.stringify(await User.find({}));
  res.send(users);
});

module.exports = router;
