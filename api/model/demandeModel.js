const mongoose = require("mongoose");

const DemandeConge = new mongoose.Schema({
  debut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fin: {
    type: Date,
    required: true,
    default: Date.now,
  },
  reason: {
    type: String,
    required: true,
  },

  msg: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

module.exports = mongoose.model("Demande", DemandeConge);
