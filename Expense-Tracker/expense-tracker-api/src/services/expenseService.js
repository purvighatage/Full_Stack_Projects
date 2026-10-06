const { readExpenses, writeExpenses } = require('../utils/fileStorage');
const { createExpense } = require('../models/expenseModel');

function normalizeAmount(amount) {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('Amount must be greater than 0');
  }
  return Number((Math.round(numericAmount * 100) / 100).toFixed(2));
}

function toCents(amount) {
  return Math.round(normalizeAmount(amount) * 100);
}

function toCurrency(cents) {
  return Number((cents / 100).toFixed(2));
}

function sortExpenses(expenses) {
  return [...expenses].sort((left, right) => {
    const leftDate = new Date(left.date).getTime();
    const rightDate = new Date(right.date).getTime();
    if (leftDate !== rightDate) return leftDate - rightDate;
    return String(left.title).localeCompare(String(right.title));
  });
}

async function addExpense(data) {
  const expenses = await readExpenses();
  const expense = createExpense({ ...data, amount: normalizeAmount(data.amount) });
  expenses.push(expense);
  await writeExpenses(expenses);
  return expense;
}

async function getAllExpenses(filter = {}) {
  const expenses = await readExpenses();
  const normalizedCategory = typeof filter.category === 'string' ? filter.category.trim().toLowerCase() : '';
  const filteredExpenses = normalizedCategory
    ? expenses.filter(e => String(e.category || '').trim().toLowerCase() === normalizedCategory)
    : expenses;
  return sortExpenses(filteredExpenses);
}

async function getSummary() {
  const expenses = await readExpenses();
  const totalCents = expenses.reduce((sum, e) => sum + toCents(e.amount), 0);
  return { totalAmount: toCurrency(totalCents), totalCount: expenses.length };
}

async function getCategorySummary() {
  const expenses = await readExpenses();
  const map = {};
  expenses.forEach(e => {
    const categoryName = String(e.category || '').trim();
    if (!categoryName) return;
    if (!map[categoryName]) map[categoryName] = 0;
    map[categoryName] += toCents(e.amount);
  });

  return Object.fromEntries(
    Object.entries(map).map(([categoryName, cents]) => [categoryName, toCurrency(cents)])
  );
}

async function deleteExpense(id) {
  const expenses = await readExpenses();
  const idx = expenses.findIndex(e => e.id === id);
  if (idx === -1) return false;
  const [removed] = expenses.splice(idx, 1);
  await writeExpenses(expenses);
  return removed;
}

module.exports = { addExpense, getAllExpenses, getSummary, getCategorySummary, deleteExpense };
