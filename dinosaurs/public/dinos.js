// dino.js
const API_URL = 'https://dino-api-xstn.onrender.com/dinosaurs';

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log('Dino data:' , data);
        displayDinosaurs(data);
    })
    .catch(err => {
        console.error('Failed to load dinosaurs.', err);
});

function imageURL(dinoName) {
    const fileName = dinoName.replace(/\s+/g, '').toLowerCase() + '.jpg';
    return imgPath = `images/${fileName}`;
}

function displayDinosaurs(dinos){
    const container = document.getElementById('dino-cards');
    container.innerHTML = '';

    dinos.forEach(dino => {
        // Create card div
        const card = document.createElement('div');
        card.className = 'dino-card';
        
        const imgPath = imageURL(dino.dinosaur_name)
        // Add the dino info
        card.innerHTML = `
            <img src="${imgPath}" alt="${dino.dinosaur_name}"/>
            <h3>${dino.dinosaur_name}</h3>
            <p><strong>Habitat: </strong>${dino.habitat}</p>
            <p><strong>Period: </strong>${dino.time_period}</p>
            <p>Featured in Museum: ${dino.museums_list}</p>
            <a href="${dino.wiki_link}">Wikipedia</a>
        `;
        
        container.appendChild(card);
    });
}