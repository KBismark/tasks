export const updateStrengthIndicator = (strength) => {
    const strengthText = document.getElementById('strengthText');
    const bars = document.querySelectorAll('.strength-bars .bar');
    
    strengthText.textContent = strength.strength;
    
    // Reset all bars
    bars.forEach(bar => {
        bar.className = 'bar';
    });

    // Update active bars based on strength
    for (let i = 0; i < strength.score; i++) {
        bars[i].className = `bar active ${strength.className||strength.strength.toLowerCase()}`;
    }
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
};

