# Smart Expense Tracker API

A production-style REST API for tracking personal expenses, built with **Node.js**, **Express**, and local JSON persistence — complete with input validation, Swagger documentation, and an automated test suite.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running Tests](#running-tests)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [API Endpoints](#api-endpoints)

---

## Overview

This project implements a simple but robust expense tracker that supports creating, viewing, filtering, summarizing, and deleting expenses. It's designed to behave predictably under edge cases (empty data, invalid input, decimal precision) rather than just the happy path.

**Highlights:**
- Local JSON file persistence via Node's file system APIs — no database setup required
- Input validation with `express-validator`
- Consistent, structured JSON responses for both success and error cases
- Interactive Swagger documentation at `/api-docs`
- Automated tests with **Jest** and **Supertest**

---

## Features

| Capability | Description |
|---|---|
| **Create** | Add a new expense with title, amount, category, and date |
| **Read** | Retrieve all expenses, or filter by category |
| **Summarize** | Calculate overall totals and per-category totals |
| **Delete** | Remove an expense by ID |
| **Validate** | Reject missing/invalid fields with clear error messages |
| **Edge cases** | Safely handle empty datasets and decimal amounts |

---

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

---

## Installation

Clone the repository, then install dependencies:

```bash
npm install
```

---

## Running the Server

**Standard start:**
```bash
npm start
```

**Development mode (auto-reload on file changes):**
```bash
npm run dev
```

The server runs at:
```
http://127.0.0.1:3000
```

---

## Running Tests

```bash
npm test
```

---

## API Documentation (Swagger)

Interactive API docs are available once the server is running:
```
http://127.0.0.1:3000/api-docs
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/expenses` | Create a new expense |
| `GET` | `/expenses` | Get all expenses |
| `GET` | `/expenses?category=Food` | Filter expenses by category |
| `GET` | `/expenses/summary` | Get overall total |
| `GET` | `/expenses/summary/category` | Get totals grouped by category |
| `DELETE` | `/expenses/:id` | Delete an expense by ID |

### Create Expense

**`POST /expenses`**

```json
{
  "title": "Lunch",
  "amount": 12.5,
  "category": "Food",
  "date": "2026-08-01"
}
```
