const app = require('./app');
const { initializeStorage } = require('./utils/fileStorage');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

(async () => {
  try {
    await initializeStorage();

    const server = app.listen(PORT, HOST, () => {
      console.log(`Expense Tracker API listening on http://${HOST}:${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      server.close(() => process.exit(0));
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
