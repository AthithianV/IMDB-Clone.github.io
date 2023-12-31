import createMovieCard from "../general/card.js";

export default function renderFavourites() {
  const favorites = JSON.parse(localStorage.getItem("favourites"));
  const favoritesContainer = document.querySelector(".favourites-list");
  favoritesContainer.innerHTML = "";
  favorites.forEach((movie) => {
    createMovieCard(
      movie,
      favoritesContainer,
      document.querySelector("[movieCard]")
    );
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderFavourites();
});
