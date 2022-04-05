const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const MyModel = require("./model/schema");
const dotenv = require("dotenv");



const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.URL)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT} connected at ${new Date()}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  MyModel.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(result));
});

app.post("/", (req, res) => {
  const newCity = new MyModel(req.body);
  newCity
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  MyModel.findByIdAndRemove(id)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.delete("/", (req, res) => {
  MyModel.remove()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});
