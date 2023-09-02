const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: false,
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "por favor ingrese un correo valido"],
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
      require: false,
    },
  },
  {
    methods: {
      validatePassword: function (password) {
        return bcrypt
          .hash(password, this.salt)
          .then((hashed) => password === hashed);
      },
      changePassword: function () {
        this.salt = bcrypt.genSaltSync(2);

        return this.hashe(this.password, this.salt).then((hashed) => {
          this.password = hashed;
          return this;
        });

        // const hash = this.hashe(this.password, this.salt).then((hashed) =>
        //   console.log(user)
        // );
      },
    },
  }
);

module.exports = mongoose.model("Users", UserSchema);
