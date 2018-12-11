const supertest = require("supertest");
const app = require("./../../../app");
const mongoose = require("mongoose");
const DigimonModel = require("./../../../database/models/digimon_model");

//connect to the database
beforeAll(() => {
  mongoose.connect(
    "mongodb://localhost/digimon",
    { useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;

  mongoose.connection.on("error", err => console.log(err));
});

//close the connection to the database
afterAll(async () => {
  await DigimonModel.deleteMany({});

  mongoose.connection.close();
});

describe("The user creates a new digimon", () => {
  test("POST /digimons with a valid req body and check redirect", async () => {
    const DigimonCount = await DigimonModel.count();
    const response = await supertest(app)
      .post("/authors")
      .send({
        name: "Garret",
        bio: "My bio",
        gender: "male"
      })
      .expect(302); //expects status code 302 for redirect in author controller
    const newDigimonCount = await DigimonModel.count();

    expect(response.body).toEqual({}); //expect body to give us nothing
    expect(response.headers.location).toMatch(/^\/authors\/.*$/);
    expect(newDigimonCount).toBe(authorCount + 1);
  });

  test("POST /digimons with a valid req body and match data created", async () => {
    const response = await supertest(app)
      .post("/digimons")
      .send({
        name: "Bob",
        weakness: "No Weakness",
        evolution: 1
      })
      .expect(302); //expects status code 302 for redirect in author controller

    const digimon = await DigimonModel.findOne({ name: "Bob" });
    expect(digimon).toBeTruthy();
    expect(digimon.name).toBe("Bob");
  });
});

describe("The index page lists all of the digimon", () => {
  test("GET /digimons with a valid req body and check render", async () => {
    const response = await supertest(app).get("/digimon");
  });
});
