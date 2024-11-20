import { generatePassword } from './passwordGenerator.js';
import { checkStrength } from './strengthChecker.js';
import { updateStrengthIndicator, copyToClipboard } from './uiUpdater.js';

class PasswordGeneratorApp {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.generateNewPassword();
    }

    initializeElements() {
        this.lengthSlider = document.getElementById('lengthSlider');
        this.lengthValue = document.getElementById('lengthValue');
        this.uppercaseCheck = document.getElementById('uppercaseCheck');
        this.lowercaseCheck = document.getElementById('lowercaseCheck');
        this.numbersCheck = document.getElementById('numbersCheck');
        this.symbolsCheck = document.getElementById('symbolsCheck');
        this.generateButton = document.getElementById('generateButton');
        this.passwordOutput = document.getElementById('passwordOutput');
        this.copyButton = document.getElementById('copyButton');
        this.copiedButtonText = document.createTextNode('COPIED');
        this.updateSliderColor(this.lengthSlider);
    }

    updateSliderColor(slider){
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${value}%, #18171F ${value}%, #18171F 100%)`;

    }
    attachEventListeners() {
        this.lengthSlider.addEventListener('input', () => {
            this.lengthValue.textContent = this.lengthSlider.value;
            this.updateSliderColor(this.lengthSlider);
        });

        this.generateButton.addEventListener('click', () => this.generateNewPassword());
        
        this.copyButton.addEventListener('click', async () => {
            const success = await copyToClipboard(this.passwordOutput.value);
            if (success) {
                // Update copy button state
                this.copyButton.classList.add('copied');
                this.copyButton.setAttribute('aria-label', 'Password copied');
                this.copyButton.prepend(this.copiedButtonText)
                this.copyButton.style.color = '#A4FFAF'
                
                // Reset copy button state after 2 seconds
                setTimeout(() => {
                    this.copyButton.style.color = ''
                    this.copyButton.classList.remove('copied');
                    this.copyButton.setAttribute('aria-label', 'Copy password');
                    this.copiedButtonText.remove()
                }, 2000);
            }
        });
    }

    getOptions() {
        return {
            uppercase: this.uppercaseCheck.checked,
            lowercase: this.lowercaseCheck.checked,
            numbers: this.numbersCheck.checked,
            symbols: this.symbolsCheck.checked
        };
    }

    generateNewPassword() {
        const options = this.getOptions();
        const length = parseInt(this.lengthSlider.value);

        // Check if at least one option is selected
        const hasSelectedOption = Object.values(options).some(option => option);
        if (!hasSelectedOption) {
            this.passwordOutput.placeholder = 'Please select at least one option';
            this.passwordOutput.style.fontSize = '16px'
            updateStrengthIndicator({ strength: '', score: 0 });
            return;
        }
        this.passwordOutput.style.fontSize = '';
        this.passwordOutput.placeholder = ''
        // Generate password and update UI
        const password = generatePassword(length, options);
        this.passwordOutput.value = password;

        // Check password strength and update indicator
        const strength = checkStrength(password, options);
        updateStrengthIndicator(strength);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGeneratorApp();
});

