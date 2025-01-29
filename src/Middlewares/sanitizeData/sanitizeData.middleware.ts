import { RequestHandler } from "express";
import { sanitizeDataWithHtml } from "../../Utils/sanitizeStringData/sanitizeStringData";

/**
 * Middleware to sanitize request data.
 * This middleware applies HTML sanitization to all string fields in the request data.
 */
export const sanitizeRequestData: RequestHandler = (req, res, next): void => {

    // Sanitize request data
    req.body = sanitizeDataWithHtml(req.body);
    req.query = sanitizeDataWithHtml(req.query);
    req.params = sanitizeDataWithHtml(req.params);
    
    next();
}