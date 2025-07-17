const API_URL = 'https://dino-api-xstn.onrender.com/dinosaurs';

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        displayDinosaurs(data);
    })
    .catch(err => {
        console.error('Failed to load dinosaurs.', err);
});

function displayDinosaurs(dinos){
    const list = document.getElementById('dino-list');
    list.innerHTML = '';

    dinos.forEach(dino => {
        const li = document.createElement('li');
        li.textContent = `${dino.name} lived in ${dino.habitat} during the ${dino.period} period.`;
    });
}