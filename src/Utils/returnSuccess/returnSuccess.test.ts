import { describe, it, expect, vi } from 'vitest';
import { Response } from 'express';
import { sendSuccess } from './returnSuccess';

describe('sendSuccess', () => {
    it('should send a success response with a status and message', () => {
        // Création d'un mock pour l'objet Response d'Express
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        const status = 200;
        const message = 'Operation successful';

        sendSuccess(res, status, message);

        // Vérifier que res.status a été appelé avec le bon statut
        expect(res.status).toHaveBeenCalledWith(status);

        // Vérifier que res.json a été appelé avec le bon objet
        expect(res.json).toHaveBeenCalledWith({
            status,
            message,
        });
    });

    it('should send a success response with data if provided', () => {
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        const status = 201;
        const message = 'Resource created';
        const data = { id: 123, name: 'Test Resource' };

        sendSuccess(res, status, message, data);

        // Vérifier que res.status a été appelé avec le bon statut
        expect(res.status).toHaveBeenCalledWith(status);

        // Vérifier que res.json a été appelé avec le bon objet incluant les données
        expect(res.json).toHaveBeenCalledWith({
            status,
            message,
            data,
        });
    });

    it('should not include data in the response if data is undefined', () => {
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        const status = 204;
        const message = 'No content';

        sendSuccess(res, status, message);

        // Vérifier que res.status a été appelé avec le bon statut
        expect(res.status).toHaveBeenCalledWith(status);

        // Vérifier que res.json a été appelé sans la clé `data`
        expect(res.json).toHaveBeenCalledWith({
            status,
            message,
        });
    });
});
