import { bdd } from "../../config/prismaClient.config";
import { throwError } from "../Utils/errorHandler/errorHandler";

/**
 * Vérifie si un appareil existe en base de données.
 * @param validatedData - Les données validées pour chercher l'appareil.
 * @returns L'appareil trouvé ou une erreur 404 si l'appareil n'est pas trouvé.
 */
export const exempleService = async <T extends object>(validatedData: T): Promise<T> => {

    // Do your logic here, like querying the database

    // const user = await bdd.user.findUnique({ where: validatedData });
    // if (!user) {
    //     throwError(404, 'User not found');
    // }

    // Return the service used
    return validatedData;
};

export const helloService = {
    exempleService
}