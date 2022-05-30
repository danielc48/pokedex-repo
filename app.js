const pokemons = document.querySelector('.pokemons');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.block');

// Sets pokemon images to the background
for (let i = 1; i <= 151; i++) {
  const newImg = document.createElement('IMG');
  const imgContainer = document.createElement('div');
  newImg.classList.add('pokemon-image', 'is-clickable');
  imgContainer.classList.add('img-container', 'box');
  newImg.setAttribute(
    'src',
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/${i}.png`
  );
  pokemons.appendChild(imgContainer).appendChild(newImg);
}

//TOGGLE MODAL ON
pokemons.addEventListener('click', function (e) {
  if (e.target.className.includes('pokemon-image')) {
    modal.classList.toggle('is-active');
    let pokemonIndex = parseInt(e.target.src.slice(120));
    // GET DATA FROM API
    try {
      async function getPokemon() {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
        );
        const data = await res.json();
        let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/${pokemonIndex}.png`;
        let pokemonName = `<b>${data.name.toUpperCase()}</b>`;
        let statistics = data.stats.map((statType) => {
          return `${statType.stat.name.toUpperCase()}: ${statType.base_stat}`;
        });
        let type = `TYPE: ${data.types[0].type.name.toUpperCase()}`;
        appendPokemonData(pokemonName, statistics, type, imgSrc);
      }
      getPokemon();
    } catch (e) {
      console.log('ERROR :( :', e);
    }
  } else {
    modal.classList.remove('is-active');
    modalContent.innerHTML = '';
  }
});

// ADD DATA TO MODAL
function appendPokemonData(pokemonName, statistics, pokemonType, imgSrc) {
  let modalImg = document.createElement('img');
  let modalTitle = document.createElement('h1');
  let pokemonStats = document.createElement('ul');
  let typeText = document.createElement('p');
  modalImg.setAttribute('src', imgSrc);
  modalImg.classList.add('modal-img');
  typeText.classList.add('pokemonType');
  pokemonStats.innerHTML = `<li>${statistics[0]}</li><li>${statistics[1]}</li><li>${statistics[2]}</li><li>${statistics[3]}</li><li>${statistics[4]}</li><li>${statistics[5]}</li>`;
  modalTitle.innerHTML = pokemonName;
  typeText.textContent = pokemonType;
  modalContent.appendChild(modalImg);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(typeText);
  modalContent.appendChild(pokemonStats);
  changeTypeColor(typeText.textContent.slice(6));
}
