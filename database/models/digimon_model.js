const mongoose = require("mongoose");
const DigimonSchema = require("./../schemas/digimon_schema");

const DigimonModel = mongoose.model("digimon", DigimonSchema);

module.exports = DigimonModel;
