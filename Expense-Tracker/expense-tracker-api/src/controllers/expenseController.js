const expenseService = require('../services/expenseService');

async function createExpense(req, res, next) {
  try {
    const expense = await expenseService.addExpense(req.body);
    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (err) {
    next(err);
  }
}

async function getExpenses(req, res, next) {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const expenses = await expenseService.getAllExpenses(filter);
    res.json({ success: true, message: 'Expenses retrieved', data: expenses });
  } catch (err) {
    next(err);
  }
}

async function getSummary(req, res, next) {
  try {
    const summary = await expenseService.getSummary();
    res.json({ success: true, message: 'Summary retrieved', data: summary });
  } catch (err) {
    next(err);
  }
}

async function getCategorySummary(req, res, next) {
  try {
    const summary = await expenseService.getCategorySummary();
    res.json({ success: true, message: 'Category summary retrieved', data: summary });
  } catch (err) {
    next(err);
  }
}

async function deleteExpense(req, res, next) {
  try {
    const removed = await expenseService.deleteExpense(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Expense not found', errors: [] });
    }
    res.json({ success: true, message: 'Expense deleted', data: removed });
  } catch (err) {
    next(err);
  }
}

module.exports = { createExpense, getExpenses, getSummary, getCategorySummary, deleteExpense };
