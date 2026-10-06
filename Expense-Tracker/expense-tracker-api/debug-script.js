(async () => {
  try {
    const { initializeStorage } = require('./src/utils/fileStorage');
    const service = require('./src/services/expenseService');
    await initializeStorage();
    await service.addExpense({ title: 'A', amount: 5, category: 'X', date: '2023-08-05' });
    await service.addExpense({ title: 'B', amount: 7, category: 'Y', date: '2023-08-05' });
    await service.addExpense({ title: 'C', amount: 3, category: 'X', date: '2023-08-05' });
    const summary = await service.getCategorySummary();
    console.log('Category summary from direct service:', summary);
  } catch (err) {
    console.error(err);
  }
})();
