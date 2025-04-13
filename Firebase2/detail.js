const getCharacterId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
};

const fetchCharacterDetail = async (id) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const character = await res.json();
    displayCharacterDetail(character);
};

const displayCharacterDetail = (character) => {
    document.getElementById('character-name').textContent = character.name;
    document.getElementById('character-image').src = character.image;
    document.getElementById('character-status').textContent = character.status;
    document.getElementById('character-species').textContent = character.species;
    document.getElementById('character-type').textContent = character.type || 'N/A';
    document.getElementById('character-gender').textContent = character.gender;
    document.getElementById('character-origin').textContent = character.origin.name;
    document.getElementById('character-location').textContent = character.location.name;
    document.getElementById('character-episodes').textContent = character.episode.length;
};

const characterId = getCharacterId();
fetchCharacterDetail(characterId);
