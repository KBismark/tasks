
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
export const generatePassword = (length, options) => {
    // Create character pool based on selected options
    let charPool = '';
    if (options.uppercase) charPool += charSets.uppercase;
    if (options.lowercase) charPool += charSets.lowercase;
    if (options.numbers) charPool += charSets.numbers;
    if (options.symbols) charPool += charSets.symbols;

    // Returns empty string if no options selected
    if (!charPool) return '';

    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    return password;
};