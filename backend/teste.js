require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log("Erro:", err.message);
  });