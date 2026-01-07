const Expense = require("../models/Expense");

// GET all expenses, newest first
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses); // ✅ returns JSON array
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense); // ✅ returns saved object
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(400).json({ message: "Invalid data", error: error.message }); // more informative
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" }); // handle invalid ID
    }

    res.status(200).json({ message: "Deleted successfully", data: deletedExpense });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};
