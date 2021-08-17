/* Animations */
const login_container = document.querySelector('#login-container');
const register_container = document.querySelector('#register-container');
const confirm_container = document.querySelector('#confirm-container');
const show_register_button = document.querySelector('#option-register');
const show_login_button = document.querySelector('#option-login');
const register_button = document.querySelector('#register-input5');
const navbar = document.querySelector('#navbar-login');


//* Event listeners for navigating to pages
show_register_button.addEventListener('click', showRegister);
function showRegister() {
    register_container.classList.add('show');
    register_container.scrollIntoView({behavior: "smooth"})
}


show_login_button.addEventListener('click', showLogin);
function showLogin() {
    navbar.scrollIntoView({behavior: "smooth"})
}


register_button.addEventListener('click', registerUser);



// Get rid of register page on back to top
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop == 0) {
        if (register_container.classList.contains('show')) {
            register_container.classList.remove('show');
        }
    }
})


const codes = document.querySelectorAll('.input-number')

codes[0].focus()

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <=9) {
            codes[idx].value = ''
            if (codes[idx + 1]) {
                setTimeout(() => codes[idx + 1].focus(), 10)
            }
        } else if(e.key === 'Backspace') {
            if (codes[idx - 1]) {
                setTimeout(() => codes[idx - 1].focus(), 10)
            }
        }
        if (idx == 5) {
            // Gather code in one string
            // Send async request
            // Depending on answer display:
            //      Code is wrong, try again
            //      Display next stage
        }
    })
})


function registerUser() {
    // Fetching data here
    // Send async request
            // Depending on answer display:
            //      Data is not valid, try again
            //      Display next stage
    navigateToConfirm();
}


function navigateToConfirm() {
    login_container.classList.remove('show');
    confirm_container.classList.add('show');
    navbar.scrollIntoView({behavior: "smooth"});
    setTimeout(() => codes[0].focus(), 900);
}

