import { DictionaryAPI } from "./api.js";

export class UIController {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.resultContainer = document.getElementById('resultContainer');
        this.errorMessage = document.getElementById('errorMessage');
        this.playButton = document.getElementById('playButton');
        this.audio = new Audio();
        this.api = new DictionaryAPI();
        this.attachEvents();
    }

    attachEvents() {
        this.searchButton.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            e.key === 'Enter'&&this.handleSearch();
        });
        this.playButton.addEventListener('click', () => this.pronunceWord());
    }

    async handleSearch() {
        const word = this.searchInput.value.trim();
        if (!word) {
            this.showError('Please enter a word to search');
            return;
        }
        try {
            const data = await this.api.searchWord(word);
            this.displayResults(data[0]);
        } catch (error) {
            this.showError('Word not found');
        }
    }

    displayResults(wordData) {
        this.errorMessage.classList.add('hidden');
        this.resultContainer.classList.remove('hidden');

        // Display the word and pronunciation
        document.getElementById('wordTitle').textContent = wordData.word;
        const phonetic = wordData.phonetic || 
            (wordData.phonetics.length > 0 ? wordData.phonetics[0].text : '');
        document.getElementById('pronunciation').textContent = phonetic;

        // Sets up audio if available
        const audioUrl = wordData.phonetics.find(p => p.audio)?.audio;
        if (audioUrl) {
            this.audio.src = audioUrl;
            this.playButton.style.display = 'block';
        } else {
            this.playButton.style.display = 'none';
        }
        this.displayWordDefinitions(wordData.meanings);
        this.displaySources(wordData.sourceUrls);
    }

    displayWordDefinitions(meanings) {
        const container = document.getElementById('definitionsContainer');
        container.innerHTML = '';

        meanings.forEach(meaning => {
            const section = document.createElement('section');
            
            const partOfSpeech = document.createElement('div');
            partOfSpeech.className = 'part-of-speech';
            partOfSpeech.textContent = meaning.partOfSpeech;
            section.appendChild(partOfSpeech);

            
            const meaningTitle = document.createElement('h3');
            meaningTitle.className = 'meanings-title';
            meaningTitle.textContent = 'Meaning';
            section.appendChild(meaningTitle);

            // Append all definition of the word
            const definitionList = document.createElement('ul');
            definitionList.className = 'definition-list';
            meaning.definitions.forEach(data => {
                const li = document.createElement('li');
                li.className = 'definition-item';
                li.textContent = data.definition;
                
                if (data.example) {
                    const example = document.createElement('p');
                    example.className = 'example';
                    example.textContent = `"${data.example}"`;
                    li.appendChild(example);
                }
                definitionList.appendChild(li);
            });
            section.appendChild(definitionList);

            // Show synonyms if available
            if (meaning.synonyms.length > 0) {
                const synonymsContainer = document.createElement('div');
                synonymsContainer.className = 'synonyms-container';
                const synonymsTitle = document.createElement('span');
                synonymsTitle.className = 'synonyms-title';
                synonymsTitle.textContent = 'Synonyms ';
                synonymsContainer.appendChild(synonymsTitle);

                const synonymsList = document.createElement('span');
                synonymsList.className = 'synonyms-list';
                synonymsList.textContent = meaning.synonyms.join(', ');
                synonymsContainer.appendChild(synonymsList);
                
                section.appendChild(synonymsContainer);
            }

            container.appendChild(section);
        });
    }

    displaySources(sources) {
        const sourceLinks = document.getElementById('sourceLinks');
        sourceLinks.innerHTML = '';
        sources.forEach(url => {
            const link = document.createElement('a');
            link.setAttribute('href',url);
            link.setAttribute('rel','noopener noreferrer');
            link.setAttribute('target','_blank');
            link.setAttribute('class','source-link');
            link.textContent = url;
            sourceLinks.appendChild(link);
        });
    }

    showError(errormessage) {
        this.errorMessage.textContent = errormessage;
        this.errorMessage.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
    }

    pronunceWord() {
        this.audio.src&&this.audio.play();
    }
}