const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { validateExpense, validateQueryCategory } = require('../middleware/validation');

router.post('/', validateExpense, expenseController.createExpense);
router.get('/', validateQueryCategory, expenseController.getExpenses);
router.get('/summary', expenseController.getSummary);
router.get('/summary/category', expenseController.getCategorySummary);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
