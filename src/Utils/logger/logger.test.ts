import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { logger } from './logger';

// Chemins des fichiers de logs
const LOGS_DIR = path.join(process.cwd(), 'logs');

describe('Logger', () => {

    it('should log error messages to the error log file', async () => {
        logger.error('Test error message');

        // Vérifie que le fichier de log d'erreur a été créé
        const files = await fs.readdir(LOGS_DIR);
        const errorLogFile = files.find(file => file.startsWith('error-') && file.endsWith('.log'));
        expect(errorLogFile).toBeDefined();

        // Vérifie le contenu du fichier de log d'erreur
        const logContent = await fs.readFile(path.join(LOGS_DIR, errorLogFile!), 'utf-8');
        expect(logContent).toContain('Test error message');
    });
});