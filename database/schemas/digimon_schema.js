const { Schema } = require("mongoose");

const DigimonSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  weakness: {
    type: String,
    require: true
  },
  evolution: {
    type: Number,
    required: true,
    default: 1
  }
});

module.exports = DigimonSchema;
