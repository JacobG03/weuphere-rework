// Elements
const login_container = document.querySelector('#login-container');
const register_container = document.querySelector('#register-container');
const confirm_container = document.querySelector('#confirm-container');
const show_register_button = document.querySelector('#option-register');
const show_login_button = document.querySelector('#option-login');
const register_button = document.querySelector('#register-input5');
const navbar = document.querySelector('#navbar-login');
const login_checkbox = document.getElementById('login-input3');

// Url's
const base_url = 'http://127.0.0.1:5000/'
const login_url = base_url + 'login'


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


// For tickin'g remember me on login form
login_checkbox.addEventListener('click', () => {
    if (!login_check.classList.contains('active')) {
        login_check.classList.add('active');
    } else {
        login_check.classList.remove('active');
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



//* Login data
const login_button = document.getElementById('login-input4');
const login_email = document.getElementById('login-input1');
const login_password = document.getElementById('login-input2');
const login_check = document.getElementsByClassName('form-check')[0];



login_button.addEventListener('click', loginUser)


async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


function loginUser() {
    login_data = {
        'email': login_email.value,
        'password': login_password.value,
        'remember_me': login_check.classList.contains('active')
    }
    getData('http://127.0.0.1:5000/api/users/login', login_data).then(data => {
        console.log(data)
        if (data['success'] == true) {
            window.location = ('http://127.0.0.1:5000/')
            return true
        }
        else if (data['message'] == ) {

        }
    })
}
