/**Created Movies create movie card which conatins image, name of the
 * movie and also favourites button,
 * Once Movie card is created it is added to particular container which
 * is passed as an argument*/

import renderFavourites from "../Favorites/favouriteScript.js";

function toggleFavourite(favoritesBtn, plus) {
  if (plus) {
    favoritesBtn.querySelector(".fa-plus").classList.add("hide");
    favoritesBtn.querySelector(".mark").classList.remove("hide");
  } else {
    favoritesBtn.querySelector(".fa-plus").classList.remove("hide");
    favoritesBtn.querySelector(".mark").classList.add("hide");
  }
}

export default function createMovieCard(movie, container, moviesCard) {
  const card = moviesCard.content.cloneNode(true).children[0];
  const movieNameEle = card.querySelector(".movie-name");
  const posterEle = card.querySelector("img");
  const favoritesBtn = card.querySelector("button");

  movieNameEle.textContent = movie.Title;
  posterEle.setAttribute("src", movie.Poster);

  const favourites = JSON.parse(localStorage.getItem("favourites"));

  if (container.classList.contains("favourites-list")) {
    favoritesBtn.addEventListener("click", () => {
      const favourites = JSON.parse(localStorage.getItem("favourites"));
      const favouriteIndex = favourites.findIndex((movieData) => {
        return movieData.imdbID === movie.imdbID;
      });
      favourites.splice(favouriteIndex, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      console.log(favourites);
      renderFavourites();
    });
  } else {
    const favouriteIndex = favourites.findIndex((movieData) => {
      return movieData.imdbID === movie.imdbID;
    });

    if (favouriteIndex != -1) {
      toggleFavourite(favoritesBtn, true);
    }

    favoritesBtn.addEventListener("click", () => {
      const favourites = JSON.parse(localStorage.getItem("favourites"));
      const favouriteIndex = favourites.findIndex((movieData) => {
        return movieData.imdbID === movie.imdbID;
      });
      console.log(favouriteIndex);
      if (favouriteIndex == -1) {
        favourites.push(movie);
        console.log(favourites);
        toggleFavourite(favoritesBtn, true);
      } else {
        favourites.splice(favouriteIndex, 1);
        console.log(favourites);
        toggleFavourite(favoritesBtn, false);
      }
      localStorage.setItem("favourites", JSON.stringify(favourites));
    });
  }

  let flag = false;
  movieNameEle.addEventListener("click", (e) => {
    if (flag) {
      flag = false;
      return;
    }
    e.preventDefault();
    localStorage.setItem("movieID", movie.imdbID);
    flag = true;
    movieNameEle.click();
  });

  container.appendChild(card);
}
