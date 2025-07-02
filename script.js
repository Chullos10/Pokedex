// Code for the start animation of the pokédex
const pokedexDoc = document.querySelector('.pokedex');
const toggleButton = document.getElementById('toggle');

window.addEventListener('load', () => {
  setTimeout(() => {
    pokedexDoc.classList.remove('closed');
  }, 500);
});

//Fetching all the pokemons
const pokemonCount = 151;
var pokedex = {};

window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);

    let pokemon = document.createElement('div');
    pokemon.id = i;
    pokemon.innerText = i.toString() + '. ' + pokedex[i]['name'].toUpperCase();
    pokemon.classList.add('pokemon-name');
    pokemon.addEventListener('click', updatePokemon);
    document.getElementById('pokemon-list').appendChild(pokemon);
  }

  console.log(pokedex);
};

async function getPokemon(num) {
  // let url = `https://pokeapi.co/api/v2/pokemon/` + num.toString();
  let url = `https://pokeapi.co/api/v2/pokemon/${num}`;

  let res = await fetch(url);
  let pokemon = await res.json();

  let pokemonName = pokemon['name'];
  let pokemonTypes = pokemon['types'];
  let pokemonImg = pokemon['sprites']['front_default'];

  res = await fetch(pokemon['species']['url']);
  let pokemonDesc = await res.json();

  pokemonDesc = pokemonDesc['flavor_text_entries'][16]['flavor_text'];

  pokedex[num] = {
    name: pokemonName,
    types: pokemonTypes,
    img: pokemonImg,
    desc: pokemonDesc,
  };
}

function updatePokemon() {
  document.getElementById('pokemon-img').src = pokedex[this.id]['img'];

  //Clear previous types
  let typesDiv = document.getElementById('pokemon-types');
  while (typesDiv.firstChild) {
    // typesDiv.removeChild(typesDiv.firstChild);
    typesDiv.firstChild.remove();
  }
  //update types
  let types = pokedex[this.id]['types'];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement('span');
    type.innerText = types[i]['type']['name'].toUpperCase();
    type.classList.add('type-box');
    type.classList.add(types[i]['type']['name']);
    typesDiv.appendChild(type);
  }

  document.getElementById('pokemon-description').innerText =
    pokedex[this.id]['desc'];
}
