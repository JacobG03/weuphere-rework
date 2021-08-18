// Elements

// Url's
const base_url = 'http://127.0.0.1:5000/'
const login_url = base_url + 'login'


//! Socket related
socket = io.connect('http://127.0.0.1:5000/')

socket.emit('connected')

socket.on('message', message => {
    console.log(message);
})


//! Fetch functions
async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}


//! Navbar

// Navbar user image
function loadNavbarData() {
    // Create image
    getData('http://127.0.0.1:5000/api/users/current_user', {})
    .then(data => {
        let image_box = document.getElementById('navbar-user');
        let image = document.createElement('img');
        image.id = 'navbar-user-image';
        image.src = data['image'];
        image_box.appendChild(image)
    });

    let show_navbar = document.getElementById('navbar-user');
    let navbar_menu = document.getElementById('navbar-menu');
    show_navbar.addEventListener('click', () => {
        if (!navbar_menu.classList.contains('active')) {
            navbar_menu.classList.add('active');
        } else {
            navbar_menu.classList.remove('active');
        }
    })

    // Functions for when user clicks any item in more menu
    let menu_items = document.getElementsByClassName('menu-item')
    for (let i = 0; i < menu_items.length; i++) {
        menu_items[i].addEventListener('click', () => {
            if (menu_items[i].id == 'menu-item-logout') {
                logoutUser();
            }
        })
    }
}




function logoutUser() {
    getData('http://127.0.0.1:5000/api/users/logout', {}).then(data => {
        console.log(data)
        if (data['success']) {
            window.location = login_url; 
        }
    })
}


function loadPageData() {
    loadNavbarData();
}


loadPageData();


