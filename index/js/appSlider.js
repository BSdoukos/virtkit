(function () {
    class AppSlider {
        constructor(containerSelector, nextButtonSelector, prevButtonSelector, pageNumberButtonsSelector, slidingMargin = 0.012) {
            this.container = {node: document.querySelector(containerSelector), width: parseFloat(getComputedStyle(document.querySelector(containerSelector)).width.replace('px', ''))};
            this.buttons = {next: document.querySelector(nextButtonSelector), prev: document.querySelector(prevButtonSelector), pageNumbers: Array.from(document.querySelectorAll(pageNumberButtonsSelector))};
            this.cards = Array.from(this.container.node.querySelectorAll('.card'));
            this.pagesNumber;
            this.actualPage = 0;
            this.slidingMargin = slidingMargin;
        }

        getPagesNumber() {
            const cardsWidth = this.cards.map((card) => {
                return parseFloat(getComputedStyle(card).width.replace('px', ''));
            }).reduce((total, cardWidth) => {
                return total + cardWidth;
            });
         
            this.pagesNumber = Math.floor(cardsWidth / this.container.width);
        }

        goToPage(number) {
            if (number >= 0 && number <= this.pagesNumber) {
                this.container.node.style.transform = `translateX(-${this.container.width * (number + (this.slidingMargin * (number)))}px)`
                this.actualPage = number;
            }
        }

        addListeners() {
            this.buttons.next.addEventListener('click', () => {
                this.goToPage(this.actualPage + 1);
            });
            this.buttons.prev.addEventListener('click', () => {
                this.goToPage(this.actualPage - 1);
            });
            this.buttons.pageNumbers.forEach((btn) => {
                btn.addEventListener('click', () => {
                    this.goToPage(parseInt(btn.querySelector('a').innerText) - 1);
                });
            });
            window.addEventListener('resize', this.reload.bind(this));
        }

        reload() {
            this.container.width = parseFloat(getComputedStyle(this.container.node).width.replace('px', ''))
            this.cards = Array.from(this.container.node.querySelectorAll('.card'));
            this.getPagesNumber();
        }

        init() {
            this.getPagesNumber();
            this.addListeners();
        }
    }


    const essentials = new AppSlider('.essentials-section > .row', '.essentials-section .pagination .page-item:last-child', '.essentials-section .pagination .page-item:first-child', '.essentials-section .pagination .pageNumberButton');
    essentials.init();

    const finances = new AppSlider('.finances-section > .row', '.finances-section .pagination .page-item:last-child', '.finances-section .pagination .page-item:first-child', '.finances-section .pagination .pageNumberButton');
    finances.init();

    Array.from(document.querySelectorAll('.app-slider')).forEach((slider) => {
        new AppSlider(slider, slider.querySelector('.pagination .page-item:last-child'))
    });
})();