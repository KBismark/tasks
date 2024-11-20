
export class DictionaryAPI {
    constructor() {
        this.apiEndpoint = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    }

    async searchWord(word) {
        try {
            const response = await fetch(`${this.apiEndpoint}${word}`);
            
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}