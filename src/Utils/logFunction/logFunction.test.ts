import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import fs from 'fs/promises';
import { writeLog, requestLog, rotateLog, initLogDir } from './logFunction';
import path from 'path';

describe('Logger', () => {
    const LOG_DIR = 'logs';
    const REQUEST_LOG_FILE = path.join(LOG_DIR, 'request.log');
    
    describe('writeLog', () => {
        it('should create a log file and write a message to it', async () => {
            const testMessage = 'Test log message';
            await writeLog(REQUEST_LOG_FILE, testMessage);

            // Vérifie que le fichier existe
            const fileExists = await fs.access(REQUEST_LOG_FILE).then(() => true).catch(() => false);
            expect(fileExists).toBe(true);

            // Vérifie le contenu du fichier
            const content = await fs.readFile(REQUEST_LOG_FILE, 'utf-8');
            expect(content).toContain(testMessage);
        });

        it('should append messages to the log file', async () => {
            const message1 = 'First log message';
            const message2 = 'Second log message';

            await writeLog(REQUEST_LOG_FILE, message1);
            await writeLog(REQUEST_LOG_FILE, message2);

            const content = await fs.readFile(REQUEST_LOG_FILE, 'utf-8');
            expect(content).toContain(message1);
            expect(content).toContain(message2);
        });
    });

    describe('requestLog', () => {
        it('should log request method and path', async () => {
            const mockReq = {
                method: 'GET',
                originalUrl: '/test',
            };
            const mockRes = {};
            const mockNext = vi.fn();

            await requestLog(mockReq as any, mockRes as any, mockNext);

            // Vérifie que le fichier contient les informations de la requête
            const content = await fs.readFile(REQUEST_LOG_FILE, 'utf-8');
            expect(content).toContain('Method: GET, Path: /test');
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe('rotateLog', () => {
        it('should rotate log file if it exceeds max size', async () => {
            // Crée un fichier de log de 6 Mo (dépasse la taille maximale de 5 Mo)
            const largeContent = 'a'.repeat(6 * 1024 * 1024);
            await fs.writeFile(REQUEST_LOG_FILE, largeContent, 'utf-8');

            await rotateLog();

            // Vérifie que le fichier original est vide
            const stats = await fs.stat(REQUEST_LOG_FILE);
            expect(stats.size).toBe(0);

            // Vérifie qu'un fichier archivé a été créé
            const files = await fs.readdir(LOG_DIR);
            const archivedFile = files.find(file => file.startsWith('request_') && file.endsWith('.log'));
            expect(archivedFile).toBeDefined();
        });

        it('should not rotate log file if it does not exceed max size', async () => {
            // Crée un fichier de log de 1 Mo (ne dépasse pas la taille maximale)
            const smallContent = 'a'.repeat(1 * 1024 * 1024);
            await fs.writeFile(REQUEST_LOG_FILE, smallContent, 'utf-8');

            await rotateLog();

            // Vérifie que le fichier n'a pas été modifié
            const content = await fs.readFile(REQUEST_LOG_FILE, 'utf-8');
            expect(content).toBe(smallContent);
        });
    });

    describe('initLogDir', () => {
        it('should create log directory if it does not exist', async () => {
            await initLogDir();

            // Vérifie que le répertoire existe
            const dirStats = await fs.stat(LOG_DIR);
            expect(dirStats.isDirectory()).toBe(true);
        });

        it('should not throw an error if log directory already exists', async () => {
            // Crée le répertoire de logs avant le test
            await fs.mkdir(LOG_DIR, { recursive: true });

            await initLogDir();

            // Vérifie que le répertoire existe toujours
            const dirStats = await fs.stat(LOG_DIR);
            expect(dirStats.isDirectory()).toBe(true);
        });
    });
});