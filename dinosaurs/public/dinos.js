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

  const museums = [
    'American Museum of Natural History',
    'Australian Museum',
    'Carnegie Museum of Natural History',
    'Denver Museum of Nature & Science',
    'Dinosaur National Monument Visitor Center',
    'Fernbank Museum of Natural History',
    'Field Museum',
    'Fukui Prefectural Dinosaur Museum',
    'Houston Museum of Natural Science',
    'Iziko South African Museum',
    'Museum für Naturkunde',
    'Museum of Paleontology Egidio Feruglio',
    'Naturalis Biodiversity Center',
    'National Museum of Nature and Science',
    'Natural History Museum',
    'Natural History Museum of Los Angeles County',
    'Perot Museum of Nature and Science',
    'Royal Belgian Institute of Natural Sciences',
    'Royal Ontario Museum',
    'Royal Tyrrell Museum of Palaeontology',
    'Smithsonian National Museum of Natural History',
    'Yale Peabody Museum of Natural History'
  ];

  const countrySelect = document.getElementById('country');
  const museumSelect = document.getElementById('museum');

  // Populate countries
  countrySelect.innerHTML = '<option value="">All</option>';
  countries.sort().forEach(country => {
    const option = document.createElement('option');
    option.value = country.toLowerCase().replace(/\s+/g, '');
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  // Populate museums
  museumSelect.innerHTML = '<option value="">All</option>';
  museums.sort().forEach(museum => {
    const option = document.createElement('option');
    option.value = museum.toLowerCase().replace(/\s+/g, '').replace(/&/g, 'and');
    option.textContent = museum;
    museumSelect.appendChild(option);
  });
});

document.getElementById('filter-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const filters = {
    continent: document.getElementById('continent').value,
    country: document.getElementById('country').value,
    period: document.getElementById('period').value,
    museum: document.getElementById('museum').value
  };

  const queryString = new URLSearchParams(filters).toString();

  fetch(`/dinosaurs?${queryString}`)
    .then(res => res.json())
    .then(data => {
      displayDinosaurs(data);
    })
    .catch(err => {
      console.error('Error filtering dinos:', err);
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