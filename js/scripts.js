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

/**
    * Creates the fetch request using fetchAPI
    * @param {string} url - the url string to call the API
    * @return {promise} each command inside this function returns a promise. The function itself doesn't return anything
    */
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

/**
    * Generates the cards based on the API info into html dynamically
    * @param {array} data - an array of objects containing all the information from the API
    * @return {users} we are returning the data for the next function that will be called
    */
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


/**
    * Generates the modul and formats it with the data array
    * @param {string} data - an array of objects containing all the information from the API
    */
function generateModule(data) {
const cardList = document.querySelectorAll('div .card');

    for(let i = 0; i < cardList.length; i++) {       
        
        cardList[i].addEventListener('click', function () {

            // Regex for the birthday - should probably do this in its own function
            const birthdayDay = data[i].dob.date.substring(8, 10);
            const birthdayMonth = data[i].dob.date.substring(5, 7);
            const birthdayYear = data[i].dob.date.substring(0, 4);
            const birthday = `Birthday: ${birthdayMonth}/${birthdayDay}/${birthdayYear}`;

            // Regex for the Phone - same as above should probably do this on its own function.
            const phone = data[i].phone;
            const phoneFormat =  phone.replace(/\D+/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

            // Format for address - again should make this its own function
            const address = `${data[i].location.street.number} ${data[i].location.street.name}. ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}`;
            
            // creates an html variable that will constanly be called each time a card is clicked
            const html = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${phoneFormat}</p>
                        <p class="modal-text">${address}</p>
                        <p class="modal-text">${birthday}</p>
                    </div>
                </div>
            
            `;

            // Everytime one of the cards gets called in gets replaces with the new html and can get cancelled by the press of a button
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

// Call the function thats starts the whole program
fetchUrl(url);