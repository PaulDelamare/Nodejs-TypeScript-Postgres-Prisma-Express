// ! IMPORTS
import { NextFunction, Request, Response } from "express";
import { handleError } from "../errorHandler/errorHandler";

/**
 * Générateur de middleware pour vérifier une clé API spécifique
 *
 * @param expectedApiKey - La clé API attendue (par exemple, provenant de process.env)
 * @return - Un middleware Express qui valide la clé API
 */
export const checkApiKey = (expectedApiKey: string = process.env.API_KEY!) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // Récupère la clef api de la requête entrante
        const api_key_header = req.header("x-api-key");

        // Compare les deux
        if (api_key_header === expectedApiKey) {

            // Si les deux sont égale, passe à la suite du code
            next();
        } else {

            // Si les deux ne sont pas égale, retourne un message d'erreur
            console.error("Non authentifié. Vous devez utiliser votre clef API.");
            handleError({ status: 401, error: "Non authentifié. Vous devez utiliser votre clef API." }, req, res);
        }
    };
};
