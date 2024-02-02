const mongoose = require("mongoose");

// Connect to MongoDB
const connectToDb = () =>
  mongoose
    .connect("mongodb://localhost:27017/websocketapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Db connected"))
    .catch((err) => console.log(err));

module.exports = connectToDb;
