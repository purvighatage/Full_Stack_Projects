const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'expenses.json');
let storageQueue = Promise.resolve();

function queueStorageOperation(operation) {
  const queued = storageQueue.then(operation, operation);
  storageQueue = queued.catch(() => {});
  return queued;
}

async function initializeStorage() {
  return queueStorageOperation(async () => {
    try {
      await fs.mkdir(dataDir, { recursive: true });
      try {
        await fs.access(dataFile);
      } catch (err) {
        await fs.writeFile(dataFile, JSON.stringify([]), 'utf8');
      }
    } catch (err) {
      throw new Error('Failed to initialize storage: ' + err.message);
    }
  });
}

async function readExpenses() {
  return queueStorageOperation(async () => {
    try {
      const raw = await fs.readFile(dataFile, 'utf8');
      return JSON.parse(raw || '[]');
    } catch (err) {
      throw new Error('Failed to read expenses: ' + err.message);
    }
  });
}

async function writeExpenses(expenses) {
  return queueStorageOperation(async () => {
    try {
      await fs.writeFile(dataFile, JSON.stringify(expenses, null, 2), 'utf8');
    } catch (err) {
      throw new Error('Failed to write expenses: ' + err.message);
    }
  });
}

module.exports = { initializeStorage, readExpenses, writeExpenses };
