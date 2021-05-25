class FavoritesSection {
    constructor(storageItemName, containerSelector, importantChildrenSelector, addingButtonsSelector) {
        this.storageItemName = storageItemName;
        this.container = document.querySelector(containerSelector);
        this.importantChildren = Array.from(document.querySelectorAll(importantChildrenSelector));
        this.addingButtons = Array.from(document.querySelectorAll(addingButtonsSelector));
    }

    getParent(node, parentClassOrId) {
        let parent = node.parentNode;
        while (!parent.classList.contains(parentClassOrId) && parent.id !== parentClassOrId) {
            parent = parent.parentNode;
        }
        return parent;
    }
    getFavorites(dataRequested) {
        const names = JSON.parse(localStorage.getItem(this.storageItemName));    
        if (dataRequested === 'names') {
            return names;
        } else if (dataRequested === 'cards') {
            const cards = [];
            names.forEach((favoriteAppName) => {
                Array.from(document.querySelectorAll('.appsection:not(.custom-section) .card-title')).forEach((appTitle) => {
                    if (favoriteAppName === appTitle.innerText) {
                        cards.push(this.getParent(appTitle, 'card'));
                    }
                });
            });
            return cards;
        }
    }

    reset() {
        localStorage.setItem('favoriteApps', JSON.stringify([]));
    }

    addFavorite(appName) {
        const favorites = this.getFavorites('names');
        favorites.push(appName)
        localStorage.setItem(this.storageItemName, JSON.stringify(favorites));
    }

    displayFavorites() {
        const generalContainer = getParent(this.container, '.container');
        debugger
        Array.from(generalContainer.children).forEach((child) => {
            this.importantChildren.forEach((importantChild) => {
                if (child !== importantChild) {
                    generalContainer.removeChild(child);
                }
            });
        });
        this.container.classList.remove('empty');
        this.getFavorites('cards').forEach((card) => {
            this.container.appendChild(card);
        });
    }

    addListeners() {
        this.addingButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.addFavorite(this.getParent(button, 'card').querySelector('.card-title').innerText);
                button.innerText = 'Remover dos favoritos';
            });
        });
    }

    init() {
        if (this.getFavorites('names') === null || this.getFavorites('names').length === 0) {
            this.reset();
        } else {
            this.displayFavorites();
        }
        this.addListeners();
    }
}

const favorites = new FavoritesSection('favoriteApps', '.favorites-section .slider', '.favorites-section .subtitle', '.card .options .favorites-button');
favorites.init();