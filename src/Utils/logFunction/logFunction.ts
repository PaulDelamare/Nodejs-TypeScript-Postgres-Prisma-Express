import fs from 'fs/promises';
import path from 'path';
import { createFileIfDoesNotExist } from '../createFile/createFile';
import { Request, Response } from 'express';

const LOG_DIR = 'logs'; // Répertoire des logs
const REQUEST_LOG_FILE = path.join(LOG_DIR, 'request.log');
const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5 Mo

/**
 * Writes a log message to a file.
 * @param file - The log file.
 * @param message - The message to write.
 */
export const writeLog = async (file: string, message: string): Promise<void> => {
    try {
        // If the file does not exist, create it
        await createFileIfDoesNotExist(file);
        const logMessage = `${new Date().toISOString()} - ${message}\n`;
        await fs.appendFile(file, logMessage, 'utf-8');
    } catch (err) {
        console.error(`Error writing to ${file}:`, err);
    }
};

/**
 * Logs request information (method and path).
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 */
export const requestLog = async (req: Request, res: Response, next: () => void): Promise<void> => {

    // Log the request method and URL
    const method = req.method;
    const url = req.originalUrl;
    await writeLog(REQUEST_LOG_FILE, `Method: ${method}, Path: ${url}`);
    next();
};


/**
 * Rotate the request log if it exceeds the maximum size.
 * If the log exceeds the maximum size, it is renamed with a unique name and a new file is created.
 * @returns - A promise that resolves when the log rotation is complete.
 */
export const rotateLog = async (): Promise<void> => {
    try {

        // Create the log file if it does not exist
        await createFileIfDoesNotExist(REQUEST_LOG_FILE);
        const stats = await fs.stat(REQUEST_LOG_FILE);

        // Rotate the log if it exceeds the maximum size
        if (stats.size > MAX_LOG_SIZE) {
            const uniqueFileName = `request_${Date.now()}.log`;
            const rotatedFilePath = path.join(LOG_DIR, uniqueFileName);

            await fs.rename(REQUEST_LOG_FILE, rotatedFilePath);
            await fs.writeFile(REQUEST_LOG_FILE, '', 'utf-8');
            console.log(`Log rotated: ${rotatedFilePath}`);
        }
    } catch (err) {
        console.error('Error rotating log file:', err);
    }
};


/**
 * Initializes the log directory by creating it if it does not exist.
 * @returns - A promise that resolves when the log directory is initialized.
 */
export const initLogDir = async (): Promise<void> => {
    try {
        await fs.mkdir(LOG_DIR, { recursive: true });
    } catch (err) {
        console.error('Error creating log directory:', err);
    }
};