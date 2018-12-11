const app = require("./app");
const morgan = require("morgan");
const port = 3500;
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/digimon",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);

app.use(morgan("combined"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
