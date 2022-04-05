const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cityWeather = new Schema(
  {
    body: { type: Object, required: true },
  },
  {
    timestamp: true,
  }
);
const MyModel = mongoose.model("cities", cityWeather);

module.exports = MyModel;
