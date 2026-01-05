const express = require("express");
const router = express.Router();

const {
  getExpenses,
  addExpense,
  deleteExpense
} = require("../controllers/expenseController");

// GET all
router.get("/", getExpenses);

// POST new
router.post("/", addExpense);

// DELETE by id
router.delete("/:id", deleteExpense);

module.exports = router;
