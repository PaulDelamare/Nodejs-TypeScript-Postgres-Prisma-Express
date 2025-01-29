import { describe, it, expect, vi } from 'vitest';
import { handleError } from './errorHandler';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

// ! Tests
describe('handleError middleware', () => {
    const mockReq = {} as Request; // Mock request
    const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    } as unknown as Response;

    // Reset the mocks before each test
    it('should handle Prisma errors', () => {
        // Create a known Prisma error
        const prismaError = new Prisma.PrismaClientKnownRequestError('Prisma error', {
            code: 'P2002',
            clientVersion: '4.0.0',
        });

        // Spy on the `json` method of the response object
        const resSpy = vi.spyOn(mockRes, 'json');
        handleError(prismaError, mockReq, mockRes);

        // Verify that the status is correct
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(resSpy).toHaveBeenCalledWith({
            status: 400,
            error: "Erreur : le champ inconnu doit être unique. La valeur fournie est déjà utilisée.",
        });
    });

    // Test the validation error
    it('should handle unknown Prisma error', () => {

        // Create a known Prisma error
        const error = {
            code: 'P9999', // Erreur inconnue
        } as Prisma.PrismaClientKnownRequestError;

        // Call the handleError function
        handleError(error, mockReq, mockRes);

        // Verify that the status is correct
        expect(mockRes.status).toHaveBeenCalledWith(500);  // Pour les erreurs inconnues, le statut reste 500
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 500,
            error: "Erreur serveur inconnue",
        });
    });

    // Test the validation error
    it('should handle generic error', () => {

        // Create a generic error
        const error = new Error('Generic error');

        // Call the handleError function
        handleError(error, mockReq, mockRes);

        // Verify that the status is correct
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 500,
            error: 'Generic error',
        });
    });
});
