(async () => {
  try {
    const request = require('supertest');
    const app = require('./src/app');
    const { initializeStorage } = require('./src/utils/fileStorage');
    await initializeStorage();

    const r1 = await request(app).post('/expenses').send({ title: 'A', amount: 5, category: 'X', date: '2023-08-05' });
    console.log('POST 1 status', r1.status, r1.body);
    const r2 = await request(app).post('/expenses').send({ title: 'B', amount: 7, category: 'Y', date: '2023-08-05' });
    console.log('POST 2 status', r2.status, r2.body);
    const r3 = await request(app).post('/expenses').send({ title: 'C', amount: 3, category: 'X', date: '2023-08-05' });
    console.log('POST 3 status', r3.status, r3.body);

    const res = await request(app).get('/expenses/summary/category');
    console.log('GET category summary', res.status, res.body);
  } catch (err) {
    console.error(err);
  }
})();
