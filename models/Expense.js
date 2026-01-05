const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    default: "expense"
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
