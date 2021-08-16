/* Animations */

const register_container = document.querySelector('#register-container');
const show_register_button = document.querySelector('#option-register');
const navbar = document.querySelector('#navbar');

show_register_button.addEventListener('click', showRegister);

function showRegister() {
    register_container.className += ' show';
    register_container.scrollIntoView({behavior: "smooth"})
}

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 875 || document.documentElement.scrollTop > 875 ) {
        navbar.classList.add("inverted");
    }
    else {
        navbar.classList.remove("inverted");
    }
})

