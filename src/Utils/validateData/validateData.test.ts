import { describe, it, expect } from 'vitest';
import vine from '@vinejs/vine';
import { validateData } from './validateData';

describe('validateData multiple errors', () => {
    const schema = vine.object({
        name: vine.string(),
        age: vine.number().min(18),
    });

    it('should throw both "required" and "min" errors when both fields are invalid', async () => {
        const invalidData = { age: 16 };

        try {
            await validateData(schema, invalidData);
        } catch (error: any) {
            expect(error.status).toBe(400);
            expect(error.error).toEqual(expect.arrayContaining([
                { field: 'name', rule: 'required', message: "Ce champ est obligatoire." },
                { field: 'age', rule: 'min', message: "La valeur doit être supérieure ou égale à 18." }
            ]));
        }
    });

    it('should throw "required" error when "name" is missing', async () => {
        const invalidData = { age: 20 };  // "name" is missing

        try {
            await validateData(schema, invalidData);
        } catch (error: any) {
            expect(error.status).toBe(400);
            expect(error.error).toEqual(expect.arrayContaining([
                { field: 'name', rule: 'required', message: "Ce champ est obligatoire." }
            ]));
        }
    });

    it('should throw "min" error when "age" is less than 18', async () => {
        const invalidData = { name: 'John', age: 16 };  // "age" is below the minimum

        try {
            await validateData(schema, invalidData);
        } catch (error: any) {
            expect(error.status).toBe(400);
            expect(error.error).toEqual(expect.arrayContaining([
                { field: 'age', rule: 'min', message: "La valeur doit être supérieure ou égale à 18." }
            ]));
        }
    });

    it('should pass validation when all fields are valid', async () => {
        const validData = { name: 'John', age: 20 };

        const result = await validateData(schema, validData);

        expect(result).toEqual(validData);
    });

    it('should throw "string" error when "name" is not a string', async () => {
        const invalidData = { name: 123, age: 20 };  // "name" is a number instead of a string

        try {
            await validateData(schema, invalidData);
        } catch (error: any) {
            expect(error.status).toBe(400);
            expect(error.error).toEqual(expect.arrayContaining([
                { field: 'name', rule: 'string', message: "Ce champ doit être une chaîne de caractères." }
            ]));
        }
    });

    it('should throw "number" error when "age" is not a number', async () => {
        const invalidData = { name: 'John', age: 'twenty' };  // "age" is a string instead of a number

        try {
            await validateData(schema, invalidData);
        } catch (error: any) {
            expect(error.status).toBe(400);
            expect(error.error).toEqual(expect.arrayContaining([
                { field: 'age', rule: 'number', message: "Ce champ doit être un nombre." }
            ]));
        }
    });
});
