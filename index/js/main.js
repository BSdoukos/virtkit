// Confirm JS
document.querySelector('html').classList.remove('no-js');
document.querySelector('html').classList.add('js');
//-----------------------------------------------------------------------------------------

// Mobile menu
(function () {
    class Menu {
        constructor() {
        }
        static toggleButton = document.querySelector('.menu-button');
        static sidebar = document.querySelector('.sidebar');
    
        toggleMenu() {
            Menu.sidebar.classList.toggle('open');
        }
        toggleScrolling() {
            document.querySelector('body').classList.toggle('no-scroll');
        }
    }

    const menu = new Menu();

    Menu.toggleButton.addEventListener('click', () => {
        menu.toggleMenu();
        menu.toggleScrolling();
    });
})();
//-----------------------------------------------------------------------------------------