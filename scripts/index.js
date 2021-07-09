const navButton = document.getElementById('menu-button');
const navLinks = document.getElementsByClassName('nav-links')[0];

navButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
})