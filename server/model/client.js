const mongoose = require("mongoose");

module.exports = mongoose.model(
  "G_Client",
  mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  })
);
