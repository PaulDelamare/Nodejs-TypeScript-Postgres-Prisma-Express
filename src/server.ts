// ! IMPORTS
import { bdd } from '../config/prismaClient.config';
import { app } from './app';

// ! CONFIG
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

// ! INITIALISATION
// Lance le serveur
const server = app.listen(PORT, () => {
    // ceci est un test de push test test
    console.log(`Server running on ${API_URL}`);
});

// ! FERMETURE
// Gestion de la fermeture propre
process.on('SIGINT', async () => {
    console.log("Server shutdown...");
    await bdd.$disconnect();
    server.close(() => {
        console.log("Server stopped successfully.");
        process.exit(0);
    });
});
