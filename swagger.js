const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'MediBooker API',
        description: 'This API handles appointments, reservations, patient management, and other services for MediBooker.',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    basePath: '/',
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./index.js');  // This line will start your server from index.js after generating the Swagger document
    console.log('Swagger documentation generated successfully.');
    console.log('You can view the Swagger UI at http://localhost:3000/api-docs');
});