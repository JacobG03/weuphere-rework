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
            'Content-Type': 'application/json'
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
    getData('http://127.0.0.1:5000/api/user', {})
    .then(data => {
        let image_box = document.getElementById('navbar-user');
        let image = document.createElement('img');
        image.id = 'navbar-user-image';
        image.src = data['image'];
        image_box.appendChild(image)
    });
}

loadNavbarData();