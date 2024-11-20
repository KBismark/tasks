export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    }

    initializeTheme() {
        // Set initial theme based on system preference
        const initialTheme = this.prefersDark.matches ? 'dark' : 'light';
        this.setTheme(initialTheme);
        this.themeToggle.checked = initialTheme === 'dark';

        // Theme toggle event
        this.themeToggle.addEventListener('change', () => {
            this.setTheme(this.themeToggle.checked ? 'dark' : 'light');
        });

        // Listen for changes in system theme
        this.prefersDark.addEventListener('change', (e) => {
            this.setTheme(e.matches ? 'dark' : 'light');
            this.themeToggle.checked = e.matches;
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}
