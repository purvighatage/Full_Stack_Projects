const { body, query, validationResult } = require('express-validator');

function buildValidationErrorResponse(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.param, message: e.msg }))
    });
  }
  return null;
}

const validateExpense = [
  body('title')
    .exists({ checkNull: true, checkFalsy: true }).withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('amount')
    .exists({ checkNull: true, checkFalsy: true }).withMessage('Amount is required')
    .custom((value) => {
      if (typeof value === 'number' || typeof value === 'string') {
        const stringValue = String(value).trim();
        if (!/^\d+(\.\d{1,2})?$/.test(stringValue)) {
          throw new Error('Amount must be a positive number with at most 2 decimal places');
        }
        const parsed = Number(stringValue);
        if (!Number.isFinite(parsed) || parsed <= 0) {
          throw new Error('Amount must be greater than 0');
        }
        return true;
      }
      throw new Error('Amount must be a valid number');
    }),
  body('category')
    .exists({ checkNull: true, checkFalsy: true }).withMessage('Category is required')
    .isString().withMessage('Category must be a string')
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Category must be between 1 and 50 characters'),
  body('date')
    .exists({ checkNull: true, checkFalsy: true }).withMessage('Date is required')
    .isISO8601().withMessage('Date must be a valid ISO8601 date'),
  (req, res, next) => {
    const response = buildValidationErrorResponse(req, res);
    if (response) {
      return response;
    }

    if (req.body && Object.prototype.hasOwnProperty.call(req.body, 'id')) {
      delete req.body.id;
    }

    if (req.body && req.body.amount !== undefined) {
      req.body.amount = Number(String(req.body.amount).trim());
    }

    next();
  }
];

const validateQueryCategory = [
  query('category').optional().isString().withMessage('Category must be a string'),
  (req, res, next) => {
    const response = buildValidationErrorResponse(req, res);
    if (response) {
      return response;
    }
    next();
  }
];

module.exports = { validateExpense, validateQueryCategory };
