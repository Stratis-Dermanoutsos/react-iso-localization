/**
 * Checks if the given string has any non-falsy value.
 * 
 * @param value The string to check.
 * @returns True if the string has a value, false otherwise.
 */
const stringHasValue = (value?: string | null): boolean => {
    if (!value) return false;

    if (typeof value !== 'string') return false;

    return value.trim() !== '';
};

export {
    stringHasValue
};
