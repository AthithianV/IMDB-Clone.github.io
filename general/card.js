/**Created Movies create movie card which conatins image, name of the
 * movie and also favourites button, favourite button on clicking adds
 * movies to favorites array.
 * Once Movie card is created it is added to particular container which
 * is passed as an argument*/
export default function createMovieCard(
  movie,
  container,
  moviesCard,
  toAddBtn
) {
  const card = moviesCard.content.cloneNode(true).children[0];
  const movieNameEle = card.querySelector(".movie-name");
  const posterEle = card.querySelector("img");
  const favoritesBtn = card.querySelector("button");

  movieNameEle.textContent = movie.Title;
  posterEle.setAttribute("src", movie.Poster);

  if (toAddBtn) {
    favoritesBtn.addEventListener("click", () => {
      favoritesBtn.querySelector(".fa-plus").classList.add("hide");
      favoritesBtn.querySelector(".fa-check").classList.remove("hide");
      favoritesBtn.disabled = "true";
      const favourites = JSON.parse(localStorage.getItem("favourites"));
      if (!favourites.find((movieData) => movieData.imdbID === movie.imdbID))
        favourites.push(movie);
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