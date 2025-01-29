// ! IMPORTS
import { RequestHandler } from "express";
import { handleError } from "../Utils/errorHandler/errorHandler";
import { validateData } from "../Utils/validateData/validateData";
import vine from '@vinejs/vine'
import { sendSuccess } from "../Utils/returnSuccess/returnSuccess";
import { helloService } from "../Services/hello.services";

// ! METHODS

/**
 * Responds with a JSON object containing a 'Hello World!' message.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
const helloWorld: RequestHandler = async (req, res) => {

    // Send a success response
    sendSuccess(res, 200, 'Hello World!');
}

/**
 * Handles a request to validate and process data.
 *
 * This function validates incoming request data against a predefined schema and sends a success response if validation succeeds.
 * In case of validation errors or other exceptions, it handles the error using the error handling utility.
 *
 * @param req - The Express request object containing the request data.
 * @param res - The Express response object used to send the response.
 */

const errorRequest: RequestHandler = async (req, res) => {

    // Define validation data schema
    const schemaData = vine.object({
        name: vine.string(),
    });

    try {

        // Validate the request data
        await validateData(schemaData, req.body)

        // Send a success response
        sendSuccess(res, 200, "Hello", req.body.name);

    } catch (error) {

        // Handle the error
        handleError(error, req, res, 'HelloController.errorRequest');
    }
};

/**
 * Handles a request to the service example endpoint.
 *
 * Calls the example service with a predefined object and sends a success response
 * with the service's response data. In case of an error, it handles the error
 * using the error handling middleware.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 */

const serviceExemple: RequestHandler = async (req, res) => {

    try {
        // Call the service
        const serviceResponse = await helloService.exempleService({ name: 'exemple' });

        // You can cobine the validateData and the service call like this
        // const serviceResponse = await helloService.exempleService(await validateData(schemaData, req.body));

        // Send a success response
        sendSuccess(res, 200, "Hello", serviceResponse);

    } catch (error) {

        // Handle the error
        handleError(error, req, res, 'HelloController.serviceExemple');
    }
}

// Export all methods
export const HelloController = {
    helloWorld,
    errorRequest,
    serviceExemple
};
