const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'A simple expense tracker API using local JSON storage'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
