const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const expensesRouter = require('./routes/expenses');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Expense Tracker API is running',
    data: { status: 'ok' }
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/expenses', expensesRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    errors: []
  });
});

app.use(errorHandler);

module.exports = app;
