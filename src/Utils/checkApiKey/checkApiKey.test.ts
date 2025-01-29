import { describe, it, expect, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { checkApiKey } from "./checkApiKey";

describe("checkApiKey", () => {
    const next: NextFunction = vi.fn();

    it("Should pass if the API key is valid", () => {
        // API key valide
        const validApiKey = "VALID_API_KEY";

        // Create the middleware
        const middleware = checkApiKey(validApiKey);

        // Mock the request object
        const req = {
            header: vi.fn().mockReturnValue("VALID_API_KEY"),
        } as unknown as Request;

        const res = {} as Response;

        middleware(req, res, next);

        // Vérifie que la fonction next a été appelée
        expect(next).toHaveBeenCalled();
    });

    it("Should return a 401 error if the API key is invalid", () => {
        const validApiKey = "VALID_API_KEY";

        const middleware = checkApiKey(validApiKey);

        const req = {
            header: vi.fn().mockReturnValue("INVALID_API_KEY"),
        } as unknown as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        middleware(req, res, next);

        // Check that the status is set to 401
        expect(res.status).toHaveBeenCalledWith(401);
        // Check that the error message is returned
        expect(res.json).toHaveBeenCalledWith({
            error: "Non authentifié. Vous devez utiliser votre clef API.",
            status: 401,
        });
    });

    it("Should return a 401 error if the API key is missing", () => {
        const validApiKey = "VALID_API_KEY";

        const middleware = checkApiKey(validApiKey);

        const req = {
            header: vi.fn().mockReturnValue(null),
        } as unknown as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "Non authentifié. Vous devez utiliser votre clef API.",
            status: 401,
        });
    });
});
