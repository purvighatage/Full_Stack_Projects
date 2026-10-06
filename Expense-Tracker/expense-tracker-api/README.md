# Smart Expense Tracker API

A production-style REST API for tracking personal expenses using Node.js, Express, local JSON storage, Swagger documentation, Jest, and Supertest.

## Overview

This project implements a simple but robust expense tracker with:
- Create, view, filter, summarize, and delete expenses
- Local JSON file persistence via Node.js file system APIs
- Input validation with express-validator
- Consistent JSON responses for success and failure
- Swagger documentation at `/api-docs`
- Automated tests with Jest and Supertest

## Features

- Add a new expense
- Retrieve all expenses or filter by category
- Calculate overall totals and totals by category
- Delete an existing expense
- Validate required fields and invalid inputs
- Handle empty datasets and decimal amounts safely

## Folder Structure

```text
expense-tracker-api/
├── README.md
├── AI_NOTES.md
├── package.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   └── expenses.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── services/
│   │   └── expenseService.js
│   ├── middleware/
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── fileStorage.js
│   ├── models/
│   │   └── expenseModel.js
│   ├── data/
│   │   └── expenses.json
│   └── swagger.js
└── tests/
    └── expense.test.js
```

## Installation

```bash
npm install
```

## How to Run

Start the server:

```bash
npm start
```

Development mode with auto-reload:

```bash
npm run dev
```

The server will run at:
- http://127.0.0.1:3000

## How to Run Tests

```bash
npm test
```

## Swagger Documentation

Swagger UI is available at:
- http://127.0.0.1:3000/api-docs

## API Endpoints

### Create Expense
- Method: POST
- Path: `/expenses`
- Body:
  ```json
  {
    "title": "Lunch",
    "amount": 12.5,
    "category": "Food",
    "date": "2026-08-01"
  }
  ```

### Get All Expenses
- Method: GET
- Path: `/expenses`

### Filter Expenses by Category
- Method: GET
- Path: `/expenses?category=Food`

### Get Summary
- Method: GET
- Path: `/expenses/summary`

### Get Category Summary
- Method: GET
- Path: `/expenses/summary/category`

### Delete Expense
- Method: DELETE
- Path: `/expenses/:id`

## Example Requests

### Create Expense
```bash
curl -X POST http://127.0.0.1:3000/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Lunch","amount":12.5,"category":"Food","date":"2026-08-01"}'
```

### Get Expenses
```bash
curl http://127.0.0.1:3000/expenses
```

### Get Summary
```bash
curl http://127.0.0.1:3000/expenses/summary
```

## Example Responses

### Success Response
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": "...",
    "title": "Lunch",
    "amount": 12.5,
    "category": "Food",
    "date": "2026-08-01T00:00:00.000Z"
  }
}
```

### Validation Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be greater than 0"
    }
  ]
}
```

## Notes

- Category filtering is case-insensitive.
- Empty datasets return an empty array and zero totals.
- Amounts are rounded to two decimal places when stored and summarized.
- Missing or invalid resources return JSON error responses with appropriate status codes.
