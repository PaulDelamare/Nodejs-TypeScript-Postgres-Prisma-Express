// ! IMPORTS
import { router } from "../../config/router.config";
import { HelloController } from "../Controllers/hello.controller";
import { checkApiKey } from "../Utils/checkApiKey/checkApiKey";

// ! Requêtes
// Request hello world
router.get('/hello', HelloController.helloWorld);

// Request POST for explain error
router.post('/error', HelloController.errorRequest);

// Request POST for explain service exemple
router.post('/service', checkApiKey(), HelloController.serviceExemple);

// ! EXPORT
// Export du routeur
export default router
