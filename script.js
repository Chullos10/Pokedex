const pokedex = document.querySelector('.pokedex');
const toggleButton = document.getElementById('toggle');

window.addEventListener('load', () => {
  setTimeout(() => {
    pokedex.classList.remove('closed');
  }, 500);
});
