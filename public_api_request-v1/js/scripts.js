const gallery = document.getElementById('gallery');

// -----------------------------
// Fetch Functions
// -----------------------------
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => console.log(data.picture.medium))
    // .then(data => generateCard(data))
    

// -----------------------------
// Helper Functions
// -----------------------------
function generateCard(data) {
    let user = data.results;
    user.forEach(function(){
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
    console.log(html);
        
    });
}
// -----------------------------
// 
// -----------------------------

// -----------------------------
// 
// -----------------------------