// ! VARIABLES
// Variable avec les erreurs
export const frenchErrorMessages = {
    required: "Ce champ est obligatoire.",
    string: "Ce champ doit être une chaîne de caractères.",
    boolean: "Ce champ doit être un booléen.",
    date: "Ce champ doit être une date.",
    minLength: (meta: { data: number }) => `La valeur doit être supérieure ou égale à ${meta.data}.`,
    min: (meta: { data: number }) => `La valeur doit être supérieure ou égale à ${meta.data}.`,
    maxLength: (meta: { data: number }) => `La valeur doit être inférieure ou égale à ${meta.data}.`,
    uuid: "Ce champ doit être un UUID.",
    "date.after": (meta: { data: string }) => `Ce champ doit avoir une date superieure ou égale à aujourd'hui.`,
    number: "Ce champ doit être un nombre."
};
