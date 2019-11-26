const body = document.querySelector('body');
const gallery = document.getElementById('gallery');
const url = 'https://randomuser.me/api/?results=12&nat=us';

const div = document.createElement('div');
div.className = "modal-container"
body.append(div);
const modalContainer = document.querySelector('.modal-container');
modalContainer.style.display = 'none';

// -----------------------------
// Fetch Functions
// -----------------------------
function fetchUrl(url){
    fetch(url)
    .then(response => response.json())
    .then(data => generateCard(data))
    .then(data => generateModule(data))
    .catch(error => console.log('Error 404 ', error))
}   

// -----------------------------
// Helper Functions
// -----------------------------
function generateCard(data) {
    let users = data.results;
    users.forEach(function(user){
        const html = `
        <div class ="card">
            <div class = "card-img-container">
                <img class ="card-img" src="${user.picture.medium}" alt ="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap"> ${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}</p>
            </div>
        </div>
        `;
        gallery.innerHTML += html;
    });
    return users;
}

function generateModule(data) {
const cardList = document.querySelectorAll('div .card');
console.log(data);

    for(let i = 0; i < cardList.length; i++) {

        cardList[i].addEventListener('click', function () {
            const html = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>
            
            `;
            modalContainer.innerHTML = html;
            modalContainer.style.display = '';
            modalContainer.addEventListener('click', (event) => {
                const clicked = event.target;
                if(clicked.tagName === 'BUTTON'|| clicked.tagName === "STRONG" ) {
                    modalContainer.style.display = 'none';
                }
            });
        });
    }
   
}


fetchUrl(url);