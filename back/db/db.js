const moongose = require("mongoose");

const user = "test";
const password = "bV2lhCIkBzCXZb9F";
const uri = `mongodb+srv://${user}:${password}@cluster0.cnoyd5v.mongodb.net/carboncyp?retryWrites=true&w=majority`;

module.exports = () => {
  const connect = () => {
    moongose
      .connect(uri, {})
      .then(() => console.log("conexion exitosa a la db"))
      .catch((error) => console.log(error));
  };
  connect();
};
