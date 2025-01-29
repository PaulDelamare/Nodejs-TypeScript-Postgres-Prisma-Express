import { expect, describe, it } from 'vitest';
import { sanitizeDataWithHtml } from './sanitizeStringData';

describe('sanitizeDataWithHtml', () => {
    it('should sanitize HTML by removing disallowed tags', () => {
        const input = {
            title: '<h1>Title</h1>',
            description: '<p>Description <a href="#">link</a></p>',
        };
        const allowedTags = ['p', 'a'];
        const allowedAttributes = { a: ['href'] };

        const result = sanitizeDataWithHtml(input, allowedTags, allowedAttributes);

        // Vérification : les balises <h1> doivent être supprimées, mais <p> et <a> doivent rester
        expect(result.title).toBe('Title');  // Le <h1> est supprimé
        expect(result.description).toBe('<p>Description <a href="#">link</a></p>'); // <p> et <a> restent
    });

    it('should remove all HTML tags if no allowed tags are specified', () => {
        const input = {
            title: '<h1>Title</h1>',
            content: '<div>Some <strong>content</strong></div>',
        };

        const result = sanitizeDataWithHtml(input, []);

        // Vérification : Toutes les balises HTML doivent être supprimées
        expect(result.title).toBe('Title'); // Le <h1> est supprimé
        expect(result.content).toBe('Some content'); // Le <div> et <strong> sont supprimés
    });

    it('should keep allowed attributes on tags', () => {
        const input = {
            description: '<a href="https://example.com" target="_blank">Click here</a>',
        };
        const allowedTags = ['a'];
        const allowedAttributes = {
            a: ['href', 'target'],
        };

        const result = sanitizeDataWithHtml(input, allowedTags, allowedAttributes);

        // Vérification : La balise <a> est autorisée, et son attribut `target` reste intact
        expect(result.description).toBe('<a href="https://example.com" target="_blank">Click here</a>');
    });

    it('should ignore non-string fields', () => {
        const input = {
            name: 'John',
            "age": 30,  // Non-string field
            "description": '<p>Valid HTML</p>',
        };
        const allowedTags = ['p'];

        const result = sanitizeDataWithHtml(input, allowedTags);

        // Vérification : La valeur de `age` ne doit pas être modifiée
        expect(result.age).toBe(30);
        // Le champ `description` doit être assaini
        expect(result.description).toBe('<p>Valid HTML</p>');
    });
});
