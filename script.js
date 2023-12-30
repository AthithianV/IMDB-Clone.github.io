import debounce from "./general/debounce.js";
import loadMovies from "./general/loadMovies.js";
// import loadMovies from "general/loadMovies.js";

export const searchResult = document.querySelector(".search-results");
const searchInput = document.querySelector("#search-input");
export const results = document.querySelector(".results");
export const loading = document.querySelector(".loading");

if (!localStorage.key("favourites"))
  localStorage.setItem("favourites", JSON.stringify([]));

/*Looks for input in the search bar, if an non empty string is given as.
a value of input then loadMovies function is called*/
searchInput.addEventListener("input", (e) => {
  results.innerHTML = "";
  loading.classList.remove("hide");
  const key = e.target.value.trim();
  if (key != "") searchMovies(key);
  else {
    loading.classList.add("hide");
    results.innerHTML = "";
    return;
  }
});

const searchMovies = debounce((text) => {
  loadMovies(`${text}`, 1);
}, 1000);

window.addEventListener("DOMContentLoaded", () => {
  // localStorage.clear();
  // console.log(localStorage);
  searchInput.value = "";
  searchInput.text = "";
});
