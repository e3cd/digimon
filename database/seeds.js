const faker = require("faker");
const ProductModel = require("./models/digimon_model");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/digimon",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);

let productPromises = [];

for (let i = 0; i <= 50; i++) {
  console.log(`Creating digimon ${i}`);
  productPromises.push(
    ProductModel.create({
      name: faker.name.firstName(),
      weakness: faker.hacker.noun(),
      evolution: faker.random.number({ min: 1, max: 4 })
    })
  );
}

Promise.all(productPromises)
  .then(() => {
    console.log("All seeds successful");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
