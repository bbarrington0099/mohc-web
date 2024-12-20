const mobileMenuButton = document.getElementById('mobile-menu-button');
const pageSideContainer = document.getElementById('page-side');
const navOptions = document.getElementsByClassName('nav-option');
const contentFrame = document.getElementById('mainContent');

const initialize = () => {
    contentFrame.src = `./InProgress/index.html`;
    
    for (let navOption of navOptions) {
        navOption.addEventListener('click', (event) => {
            toggleMobileMenu();
            
            for (let navOption of navOptions) {
                navOption.classList.remove('selected');
                navOption.removeAttribute('disabled');
            }

            event.target.classList.add('selected');
            event.target.setAttribute('disabled', 'true');
            contentFrame.src = `./${event.target.getAttribute('data-dir')}/index.html`;
        })
    }
}

toggleMobileMenu = () => {
    pageSideContainer.classList.toggle('opened');
    pageSideContainer.classList.toggle('closed');
    mobileMenuButton.classList.toggle('opened');
    mobileMenuButton.classList.toggle('closed');
}

document.addEventListener("DOMContentLoaded", initialize);