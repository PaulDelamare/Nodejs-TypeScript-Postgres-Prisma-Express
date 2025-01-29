// ! IMPORTS
import express from 'express';
import configureMiddleware from '../config/apiConfigMiddleware.config';

// ! Routes Imports
import helloRoutes from './Routes/hello.routes';


// ! Middleware
const app = express();

// Configure the safety middleware
configureMiddleware(app);


// ! Routes
// Use the routes
app.use('/api', helloRoutes);


// ! EXPORT
export { app };