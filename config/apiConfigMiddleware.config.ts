// ! IMPORTS
import express, { Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { requestLog, rotateLog } from '../src/Utils/logFunction/logFunction';
import { logger } from '../src/Utils/logger/logger';
import createRateLimiter from '../src/Middlewares/rateLimiter/rateLimiter.middleware';
import { sanitizeRequestData } from '../src/Middlewares/sanitizeData/sanitizeData.middleware';

// ! FONCTION

/**
 * Configue Middleware for an express application
 * 
 * @param app - The Express application instance to configure middleware for.
 * 
 * The function sets up various middleware functionalities including:
 * - Parsing incoming request bodies as JSON.
 * - Enabling CORS for the API.
 * - Securing the API with Helmet.
 * - Compressing the response body with specific filter conditions.
 * - Trusting proxy settings for certain network interfaces.
 * - Limiting the number of requests per window via a rate limiter.
 * - Sanitizing request data to prevent malicious input.
 * - Logging and rotating logs for incoming requests, including method, URL, and IP information.
 */

const configureMiddleware = (app: express.Application) => {
    // Use this middleware to parse the incoming request bodies
    app.use(express.json());

    // Cors for the API
    app.use(cors());

    // Middleware for the api security
    app.use(helmet());

    // For compressing the response body
    app.use(compression(
        {
            threshold: 1024,
            filter: (req: Request) => {
                if (req.headers['x-no-compression']) {
                    return false;
                }
                return !req.path.match(/\.(jpg|jpeg|png|gif|pdf|svg|mp4)$/i);
            }
        }
    ));

    // Middleware the proxy 
    app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

    // Defined the limit of the request
    const limiter = createRateLimiter(15, 100);
    app.use(limiter);

    // Middleware for the sanitize data
    app.use(sanitizeRequestData);

    // Middleware for have the log of the request
    app.use((req, res, next) => {
        rotateLog();
        requestLog(req, res, next);

        logger.info(` ${req.method} - ${req.url} - IP:  ${req.ip}`);
    });
};

// ! EXPORT
export default configureMiddleware;
