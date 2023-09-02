const router = require("express").Router();
const User = require("../schemas/Users");
const Favorite = require("../schemas/Favorites");
const multer = require("multer");
const path = require("path");

const bcrypt = require("bcrypt");
const { validatePassword } = require("../config/validatePassword");
const { generateToken, validateToken } = require("../config/token");

const current_dir = "./user.js";
const multerFunction = multer({
  storage: multer.diskStorage({
    destination: path.join(current_dir, "../favorites"),
    filename: (req, file, cb) => {
      console.log(file, "here");
      const extension = path.extname(file.originalname);
      const fileName = file.originalname.split(extension)[0];
      cb(null, `${fileName}${extension}`);
    },
  }),
});

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
  if (!user) return res.sendStatus(401);
  console.log(user.id, "this is the userId");
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
  res.send(req.user);
});

router.put("/editMe/:id", async (req, res) => {
  console.log("hello world");
  const { oldPassword, newPassword } = req.body;
  console.log(req.body, "this is the reqbody");
  const { id } = req.params;

  const payload = {
    name: req.body.name,
    lastname: req.body.lastname,
    id,
    email: req.body.email,
    password: newPassword,
  };
  if (oldPassword && newPassword) {
    const user = await User.findById(id);
    const validator = await validatePassword(user, oldPassword);
    if (!validator) return res.status(401).send("old password is incorrect");
    const hashed = await bcrypt.hash(newPassword, user.salt);
    payload.password = hashed;
  }
  const userUpdated = await User.updateOne({ _id: id }, payload);
  const token = generateToken(payload);

  return res.send({ token, payload, newPassword });
});

//routes for test

router.get("/allUsers", async (req, res) => {
  const allUser = JSON.stringify(await User.find({}));
  res.send(allUser);
});

router.delete("/delete", async (req, res) => {
  await Favorite.deleteMany({});
  const users = JSON.stringify(await Favorite.find({}));
  res.send(users);
});

router.post("/addFavorite", multerFunction.single("file"), async (req, res) => {
  console.log(req.file);
  const { binaryCode, user_id, formatAndName } = req.body;
  const favoriteCreated = await Favorite.create({
    user_id,
    binaryCode,
    formatAndName,
  });
  res.send(favoriteCreated).status(201);
});

router.get("/getAllFavorites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const favorites = await Favorite.find({
      user_id: id,
    }).populate({ path: "user_id", select: "binaryCode" });
    res.send(favorites);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
