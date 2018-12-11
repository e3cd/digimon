const express = require("express");
const router = express.Router();
const DigimonController = require("./../controllers/digimon_controller");

const { celebrate, Joi } = require("celebrate"); //use celebrate for validation

router.get("/digimons", DigimonController.index);

router.post(
  "/digimons",
  celebrate({
    body: {
      name: Joi.string().required(),
      weakness: Joi.string().required(),
      evolution: Joi.number()
        .required()
        .min(0)
    }
  }),
  DigimonController.create
);

router.post("/digimons/new", DigimonController.make);

router.get("/digimons/:id", DigimonController.show);

router.put("/digimons/:id", DigimonController.update);

router.patch("/digimons/:id", DigimonController.update);

router.delete("/digimons/:id", DigimonController.destroy);

module.exports = router;
