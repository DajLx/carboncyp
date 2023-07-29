const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);
app.listen(3001, () => {
  db();
  console.log("server listening on port 3001");
});

module.exports = app;
