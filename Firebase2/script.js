const apiUrl = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;

const fetchCharacters = async (page) => {
    const res = await fetch(`${apiUrl}?page=${page}`);
    const data = await res.json();
    displayCharacters(data.results);
};

const displayCharacters = (characters) => {
    const gallery = document.getElementById('character-gallery');
    gallery.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Species: ${character.species}</p>
            <p>Status: ${character.status}</p>
            <a href="character-detail.html?id=${character.id}" target="_blank">View Details</a>
        `;
        gallery.appendChild(card);
    });
};

document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

const updateClock = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    document.getElementById('clock').textContent = now.toLocaleDateString('en-US', options);
};

fetchCharacters(currentPage);
setInterval(updateClock, 1000);
