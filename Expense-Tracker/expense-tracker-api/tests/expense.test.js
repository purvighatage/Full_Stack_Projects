const request = require('supertest');
const fs = require('fs').promises;
const path = require('path');
const app = require('../src/app');
const { initializeStorage } = require('../src/utils/fileStorage');

const dataFile = path.join(__dirname, '..', 'src', 'data', 'expenses.json');

beforeEach(async () => {
  await initializeStorage();
  await fs.writeFile(dataFile, JSON.stringify([], null, 2), 'utf8');
});

describe('Expense API', () => {
  test('Create expense', async () => {
    const res = await request(app)
      .post('/expenses')
      .send({ title: 'Lunch', amount: 12.5, category: 'Food', date: '2023-08-01' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
  });

  test('Get expenses', async () => {
    await request(app).post('/expenses').send({ title: 'Coffee', amount: 3, category: 'Food', date: '2023-08-02' });
    const res = await request(app).get('/expenses');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  test('Returns an empty list when no expenses exist', async () => {
    const res = await request(app).get('/expenses');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  test('Filter expenses by category', async () => {
    await request(app).post('/expenses').send({ title: 'Taxi', amount: 20, category: 'Transport', date: '2023-08-03' });
    await request(app).post('/expenses').send({ title: 'Burger', amount: 8, category: 'Food', date: '2023-08-03' });
    const res = await request(app).get('/expenses').query({ category: 'Food' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.every(e => e.category === 'Food')).toBe(true);
  });

  test('Summary endpoint', async () => {
    await request(app).post('/expenses').send({ title: 'Item1', amount: 10, category: 'Misc', date: '2023-08-04' });
    await request(app).post('/expenses').send({ title: 'Item2', amount: 15, category: 'Misc', date: '2023-08-04' });
    const res = await request(app).get('/expenses/summary');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.totalAmount).toBe(25);
    expect(res.body.data.totalCount).toBe(2);
  });

  test('Returns zero totals for an empty dataset', async () => {
    const res = await request(app).get('/expenses/summary');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual({ totalAmount: 0, totalCount: 0 });
  });

  test('Rounds totals correctly for decimal amounts', async () => {
    await request(app).post('/expenses').send({ title: 'Decimal One', amount: 0.1, category: 'Food', date: '2023-08-05' });
    await request(app).post('/expenses').send({ title: 'Decimal Two', amount: 0.2, category: 'Food', date: '2023-08-05' });
    const res = await request(app).get('/expenses/summary');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.totalAmount).toBe(0.3);
  });

  test('Returns an empty array for a category with no matches', async () => {
    await request(app).post('/expenses').send({ title: 'Lunch', amount: 8, category: 'Food', date: '2023-08-05' });
    const res = await request(app).get('/expenses').query({ category: 'Travel' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  test('Category summary', async () => {
    await request(app).post('/expenses').send({ title: 'Item A', amount: 5, category: 'X', date: '2023-08-05' });
    await request(app).post('/expenses').send({ title: 'Item B', amount: 7, category: 'Y', date: '2023-08-05' });
    await request(app).post('/expenses').send({ title: 'Item C', amount: 3, category: 'X', date: '2023-08-05' });
    const res = await request(app).get('/expenses/summary/category');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.X).toBe(8);
    expect(res.body.data.Y).toBe(7);
  });

  test('Delete expense', async () => {
    const create = await request(app).post('/expenses').send({ title: 'ToDelete', amount: 9, category: 'Misc', date: '2023-08-06' });
    const id = create.body.data.id;
    const res = await request(app).delete(`/expenses/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('Invalid amount', async () => {
    const res = await request(app).post('/expenses').send({ title: 'Bad', amount: -5, category: 'Misc', date: '2023-08-07' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Rejects amount with too many decimals', async () => {
    const res = await request(app).post('/expenses').send({ title: 'Precise', amount: 12.345, category: 'Misc', date: '2023-08-07' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Rejects title that is too long', async () => {
    const longTitle = 'A'.repeat(101);
    const res = await request(app).post('/expenses').send({ title: longTitle, amount: 5, category: 'Misc', date: '2023-08-07' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Missing title', async () => {
    const res = await request(app).post('/expenses').send({ amount: 5, category: 'Misc', date: '2023-08-07' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Invalid date', async () => {
    const res = await request(app).post('/expenses').send({ title: 'BadDate', amount: 5, category: 'Misc', date: 'not-a-date' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Delete nonexistent expense', async () => {
    const res = await request(app).delete('/expenses/nonexistent-id');
    expect(res.statusCode).toBe(404);
  });
});
