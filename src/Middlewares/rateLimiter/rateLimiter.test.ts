import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Request, Response } from 'express';
import createRateLimiter from './rateLimiter.middleware';

describe('Rate Limiting Middleware', () => {
    let app: express.Express;

    beforeEach(() => {
        app = express();
        const limiter = createRateLimiter(1, 2); // 1 minute, max 2 requests
        app.use(limiter);
        app.get('/', (req: Request, res: Response) => {
            res.json({ message: 'OK' });
        });
    });

    it('Allows requests if the limit is not reached', async () => {
        const res1 = await request(app).get('/');
        const res2 = await request(app).get('/');

        expect(res1.status).toBe(200);
        expect(res2.status).toBe(200);
        expect(res1.body).toEqual({ message: 'OK' });
        expect(res2.body).toEqual({ message: 'OK' });
    });

    it('Blocks requests after exceeding the rate limit', async () => {
        await request(app).get('/');
        await request(app).get('/');
        const res3 = await request(app).get('/');

        expect(res3.status).toBe(429);
        expect(res3.body).toEqual({
            status: 'error',
            error: 'Too many requests, please try again later.'
        });
    });
});
