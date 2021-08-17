/* Animations */
const login_container = document.querySelector('#login-container');
const register_container = document.querySelector('#register-container');
const show_register_button = document.querySelector('#option-register');
const show_login_button = document.querySelector('#option-login');
const navbar = document.querySelector('#navbar-login');

show_register_button.addEventListener('click', showRegister);

function showRegister() {
    register_container.classList.add('show');
    register_container.scrollIntoView({behavior: "smooth"})
}

show_login_button.addEventListener('click', showLogin);

function showLogin() {
    login_container.classList.remove('show');
    navbar.scrollIntoView({behavior: "smooth"})
}

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop == 0) {
        if (register_container.classList.contains('show')) {
            register_container.classList.remove('show');
        }
    }
})

