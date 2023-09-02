const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  binaryCode: {
    type: String,
    require: true,
  },
  formatAndName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Favorites", FavoritesSchema);
