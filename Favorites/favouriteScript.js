import createMovieCard from "../general/card.js";

const favorites = JSON.parse(localStorage.getItem("favourites"));

window.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.querySelector(".favourites-list");
  favorites.forEach((movie) => {
    createMovieCard(
      movie,
      favoritesContainer,
      document.querySelector("[movieCard]"),
      false
    );
  });
});
