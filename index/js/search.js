class SearchModel {
    constructor(){
        this.appCards = Array.from(document.querySelectorAll('.appsection:not(.custom-section) .card')).map((card) => {
            return card.cloneNode(true);
        });
        this.results;
    }
    
    search(searchText) {
        if (!searchText) {
            return;
        }

        this.results = this.appCards.filter((card) => {
            return card.querySelector('.card-title').innerText.toLowerCase().match(new RegExp(searchText, 'i')) !== null; 
        });
    }
}

class SearchView {
    constructor(field, window) {
        this.field = field;
        this.window = window;
        this.wasTyping = false;
    }

    openSearchWindow() {
        this.window.removeAttribute('style');
        this.window.classList.remove('hidden');
        setTimeout(() => this.window.style.zIndex = 0, 200)
    }

    closeSearchWindow() {
        this.window.classList.add('hidden');
        setTimeout(() => this.window.style.zIndex = -1, 200)
    }

    getSearchText() {
        let text = this.field.value;
        if (!this.wasTyping && text !== '') {
            this.wasTyping = true;
            this.openSearchWindow();
        } else if (text === '') {
            this.wasTyping = false;
            this.closeSearchWindow();
        }
        return text;
    }
}

class SearchController {
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    updateUI() {
        if (this.model.results.length === 0) {
            this.view.window.innerHTML = '';

            const noResultsText = document.createElement('p');
            noResultsText.setAttribute('class', 'no-results-text text-secondary');
            noResultsText.innerText = 'Não foi encontrado nenhum app que corresponda à sua pesquisa.'
            this.view.window.appendChild(noResultsText);

            this.view.window.classList.add('empty');
            return;

        }

        this.view.window.classList.remove('empty');
        this.view.window.innerHTML = '';;
        
        this.model.results.forEach((appCard) => {
            if (!Array.from(this.view.window.querySelectorAll('.card-title')).some((title) => {
                return title.innerText === appCard.querySelector('.card-title').innerText;
            })) {
                this.view.window.appendChild(appCard);
            }
        });
    }

    fireSearchEngine() {
        this.model.search(this.view.getSearchText.call(this.view));
        this.updateUI();
    }

    activateSearch() {
        this.view.field.addEventListener('keyup', this.fireSearchEngine.bind(this));
    }

    deactivateSearch() {
        this.view.field.removeEventListener('keyup', this.fireSearchEngine.bind(this));
    }
}

// Initializer

const sm = new SearchModel();
const sv = new SearchView(document.querySelector('#searchInputLg'), document.querySelector('#searchWindow'));
const sc = new SearchController(sm, sv);

function initSearch() {
    if (innerWidth >= 1200) {
        sv.field.addEventListener('focus', sc.activateSearch.bind(sc));
        sv.field.addEventListener('blur', sc.deactivateSearch.bind(sc));
    }

    document.querySelector('#searchButtonLg').addEventListener('click', (e) => e.preventDefault());
}
initSearch();