import { UIController } from './ui-controller.js';
import { ThemeManager } from './theme-manager.js';
import { FontManager } from './font-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    new UIController();// Set up UI
    const themeManager = new ThemeManager();
    const fontManager = new FontManager();
    themeManager.initializeTheme();
    fontManager.initializeFont();
});