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

document.addEventListener('DOMContentLoaded', () => {
    const countries = [
        'United States of America',
        'Canada',
        'Great Britain',
        'Brazil',
        'China',
        'Australia',
        'Egypt',
        'Nigeria',
        'Antarctica',
        'Mexico',
        'Argentina',
        'Germany',
        'France',
        'India',
        'Japan',
        'South Korea',
        'New Zealand',
        'South Africa',
        'Kenya',
        'Chile',
        'Belgium',
        'Thailand',
        'Mongolia',
        'Portugal',
        'Tanzania',
        'Switzerland',
        'Niger',
        'Morocco',
        'Russia',
        'Cameroon',
        'Netherlands'
];

const select = document.getElementById('country');

// Clear existing options except "All"
select.innerHTML = '<option value="">All</option>';

countries.sort().forEach(country => {
    const option = document.createElement('option');
    option.value = country.toLowerCase().replace(/\s+/g, '');
    option.textContent = country;
    select.appendChild(option);
});
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
            <div class="dino-info">
                <h3>${dino.dinosaur_name}</h3>
                <p><strong>Habitat: </strong>${dino.habitat}</p>
                <p><strong>Period: </strong>${dino.time_period}</p>
                <p><strong>Featured in Museum: </strong>${dino.museums_list}</p>
                <a href="${dino.wiki_link}">Wikipedia</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}