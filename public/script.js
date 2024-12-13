const mobileMenuButton = document.getElementById('mobile-menu-button');
const pageSideContainer = document.getElementById('page-side');
const navOptions = document.getElementsByClassName('nav-option');

initializePage();

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

// define a function that sets min-height of my-element to window.innerHeight:
const setMobileViewHeight = () => {
    // set vh to the amount of pixels that equal %1 of the innerhieght
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--mobile-vh', `${vh}px`);
};

const initializePage = () => {
    // define mobile screen size:
    const deviceWidth = window.matchMedia("(max-width: 600px)");
    
    if (deviceWidth.matches) {
        setMobileViewHeight();
        window.addEventListener("resize", setMobileViewHeight);
    }
}