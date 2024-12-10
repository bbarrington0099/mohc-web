const mobileMenuButton = document.getElementById('mobile-menu-button');
const pageSideContainer = document.getElementById('page-side');
const navOptions = document.getElementsByClassName('nav-option');

toggleMobileMenu = () => {
    pageSideContainer.classList.toggle('opened');
    pageSideContainer.classList.toggle('closed');
    mobileMenuButton.classList.toggle('opened');
    mobileMenuButton.classList.toggle('closed');
}

for (let navOption of navOptions) {
    navOption.addEventListener('click', (event) => {
        toggleMobileMenu();
        for (let navOption of navOptions) {
            navOption.classList.remove('selected');
        }
        event.target.classList.add('selected');
    })
}
