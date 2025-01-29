import { describe, it, expect, afterEach } from 'vitest';
import { createFileIfDoesNotExist } from './createFile';
import fs from 'fs/promises';

describe('createFileIfDoesNotExist', () => {
    const testFileName = 'testFile.txt';

    // Nettoyer après chaque test
    afterEach(async () => {
        try {
            await fs.unlink(testFileName);
        } catch (error) {
            // Ignore si le fichier n'existe pas
        }
    });

    it('should create a file if it does not exist', async () => {
        await createFileIfDoesNotExist(testFileName);

        // Vérifie que le fichier existe
        const fileExists = await fs.access(testFileName).then(() => true).catch(() => false);
        expect(fileExists).toBe(true);
    });

    it('should not create a file if it already exists', async () => {
        // Crée un fichier avant le test
        await fs.writeFile(testFileName, 'initial content', 'utf-8');

        await createFileIfDoesNotExist(testFileName);

        // Vérifie que le contenu du fichier n'a pas été modifié
        const fileContent = await fs.readFile(testFileName, 'utf-8');
        expect(fileContent).toBe('initial content');
    });
});