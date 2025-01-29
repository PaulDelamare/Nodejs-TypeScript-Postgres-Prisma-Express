// ! TYPE
// Interface pour les messages de validation
export interface ValidationMessage {
    field: string;
    rule: string;
    message: string;
    meta?: Record<string, any>; // Ajout de `meta` pour les règles qui ont des valeurs supplémentaires (comme `max`, `min`, etc.)
}