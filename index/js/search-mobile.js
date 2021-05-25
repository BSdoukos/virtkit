class MobileSearchModel extends SearchModel {
    constructor(appCards, results) {
        super(appCards, results)
    }
}

class MobileSearchView extends SearchView {
    constructor(field, searchButton, window) {
        super();
        this.field = field;
        this.searchButton = searchButton;
        this.window = window;
    }
}

class MobileSearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    updateMobileUI() {
        this.view.window.classList.remove('hidden');
        document.querySelector('main').classList.add('hidden');

        if (!this.model.results || this.model.results.length === 0) {
            this.view.window.innerHTML = '';

            const noResultsText = document.createElement('p');
            noResultsText.setAttribute('class', 'no-results-text text-secondary');
            noResultsText.innerText = 'Não foi encontrado nenhum app que corresponda à sua pesquisa.'
            this.view.window.appendChild(noResultsText);
            return;

        }

        this.view.window.innerHTML = '';
        this.model.results.forEach((appCard) => {
            if (!Array.from(this.view.window.querySelectorAll('.card-title')).some((title) => {
                return title.innerText === appCard.querySelector('.card-title').innerText;
            })) {
                this.view.window.appendChild(appCard);  
            }
        });
    }

    fireMobileSearchEngine(e) {
        if (e) e.preventDefault();
        this.model.search(this.view.field.value);
        this.updateMobileUI();
    }
}

// Initializer
const msm = new MobileSearchModel();
const msv = new MobileSearchView(document.querySelector('#searchInputSm'), document.querySelector('#searchButtonSm'), document.querySelector('#mobileSearchWindow'));
const msc = new MobileSearchController(msm, msv);

delete msv.getSearchText;

function initMobileSearch() {
    if (innerWidth < 1200) {   
        msv.searchButton.addEventListener('click', msc.fireMobileSearchEngine.bind(msc));
    }
}
initMobileSearch();

window.addEventListener('resize', function closeSearch() {
    sv.window.classList.add('hidden');
    msv.window.classList.add('hidden');
    document.querySelector('main').classList.remove('hidden');
    initSearch();
    initMobileSearch();
});