// ! IMPORTS
import rateLimit from 'express-rate-limit';

// ! FONCTIONS

/**
 * Creates an Express middleware to limit the number of requests in a given time window.
 *
 * @param {number} minutes - The time window in minutes.
 * @param {number} maxRequests - The maximum number of requests allowed in the window.
 *
 * @returns {RequestHandler} - The Express middleware.
 */
function createRateLimiter(minutes: number, maxRequests: number) {
    return rateLimit({
        // Convert minutes to milliseconds
        windowMs: minutes * 60 * 1000,

        // Number of requests allowed in the window
        max: maxRequests,
        
        /**
         * Function to handle requests that exceed the rate limit.
         *
         * @param {Request} req - The request object
         * @param {Response} res - The response object
         */
        handler: (req, res) => {
            res.status(429).json({
                status: 'error',
                error: 'Too many requests, please try again later.'
            });
        }
    });
}

// ! EXPORT
export default createRateLimiter;
