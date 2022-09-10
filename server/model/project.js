const mongoose = require("mongoose");

module.exports = mongoose.model(
  "G_Project",
  mongoose.Schema({
    name: { type: String },
    description: { type: String },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "G_Client"
    }
  })
);
