const movieId = localStorage.getItem("movieID");

const main = document.querySelector("main");
const title = document.querySelector(".title");
const year = document.querySelector(".year");
const duration = document.querySelector(".duration");
const rating = document.querySelector(".score");
const votes = document.querySelector(".vote-count");
const poster = document.querySelector("img");
const button = document.querySelector(".addToFavourites");
const genreContainer = document.querySelector(".genre");
const plot = document.querySelector(".plot-para");
const date = document.querySelector(".date");
const director = document.querySelector(".director");
const writers = document.querySelector(".writers");
const stars = document.querySelector(".stars");

function renderPage(movieData) {
  title.textContent = movieData.Title;
  year.textContent = movieData.Year;
  duration.textContent = movieData.Runtime;
  rating.textContent = movieData.imdbRating;
  votes.textContent = movieData.imdbVotes;
  poster.setAttribute("src", movieData.Poster);
  plot.textContent = movieData.Plot;
  date.textContent = movieData.Released;
  director.textContent = movieData.Director;
  writers.textContent = movieData.Writer;
  stars.textContent = movieData.Actors;

  genreContainer.innerHTML = "";
  movieData.Genre.split(", ").forEach((genre) => {
    const genreEle = document.createElement("p");
    genreEle.textContent = genre;
    genreContainer.appendChild(genreEle);
  });

  function toggleFavourites() {
    button.innerHTML = `<i class="fa-solid fa-check black"> <span>Added</span>`;
    button.style.backgroundColor = "grey";
    button.disabled = "true";
  }

  const favourites = JSON.parse(localStorage.getItem("favourites"));
  if (
    favourites.find((movie) => {
      return movie.imdbID === movieData.imdbID;
    })
  ) {
    toggleFavourites();
  }

  button.addEventListener("click", () => {
    favourites.push(movieData);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    toggleFavourites();
  });
}

async function fetchMovieDetails(movieID) {
  try {
    const url = `https://www.omdbapi.com/?i=${movieID}&apikey=cb638678`;
    const request = await fetch(url);
    const moviedata = await request.json();
    renderPage(moviedata);
  } catch (err) {
    main.innerHTML = "Movie Does not exists in database";
    console.error(err);
  }
}

fetchMovieDetails(movieId);
