
const strengthLevels = {
    tooWeak: { strength: 'TOO WEAK!', score: 1, className: 'too-weak' },
    weak: { strength: 'WEAK', score: 2 },
    medium: { strength: 'MEDIUM', score: 3 },
    strong: { strength: 'STRONG', score: 4 }
};
export const checkStrength = (password, options) => {
    if (!password) return { strength: '', score: 0, className: 'too-weak' };
    let score = 0;
    const length = password.length;

    // Add points based on character variety
    if (options.uppercase) score += 1;
    if (options.lowercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 1;

    // Determine strength based on score and pssword length
    if(score>=3&&length>=12) return strengthLevels.strong;
    if(score>=2&&length>=8) return strengthLevels.medium;
    if(score==1&&length>=8) return strengthLevels.weak;
    return strengthLevels.tooWeak;
};
