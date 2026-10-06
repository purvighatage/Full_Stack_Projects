const { v4: uuidv4 } = require('uuid');

function createExpense({ title, amount, category, date, id }) {
  return {
    id: id || uuidv4(),
    title: String(title).trim(),
    amount: Number(amount),
    category: String(category).trim(),
    date: new Date(date).toISOString()
  };
}

module.exports = { createExpense };
