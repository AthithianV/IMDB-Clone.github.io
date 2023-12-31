import debounce from "./general/debounce.js";
import loadMovies from "./general/loadMovies.js";

export const searchResult = document.querySelector(".search-results");
const searchInput = document.querySelector("#search-input");
export const results = document.querySelector(".results");
export const loading = document.querySelector(".loading");
const heading = document.querySelector(".heading");
export const pageNoSection = document
  .querySelector("[pageNo]")
  .content.cloneNode(true).children[0];
const submitEle = document.querySelector("form");

if (!localStorage.key("favourites"))
  localStorage.setItem("favourites", JSON.stringify([]));

function toggleFavourite(favoritesBtn, plus) {
  if (plus) {
    favoritesBtn.querySelector(".fa-plus").classList.add("hide");
    favoritesBtn.querySelector(".mark").classList.remove("hide");
  } else {
    favoritesBtn.querySelector(".fa-plus").classList.remove("hide");
    favoritesBtn.querySelector(".mark").classList.add("hide");
  }
}

function searchAction(key) {
  results.innerHTML = "";
  heading.classList.add("hide");
  loading.classList.remove("hide");

  if (key != "") {
    searchMovies(key);
  } else {
    heading.classList.remove("hide");
    loading.classList.add("hide");
    pageNoSection.classList.add("hide");
    results.innerHTML = "";
    return;
  }
}

/*Looks for input in the search bar, if an non empty string is given as.
a value of input then loadMovies function is called*/
searchInput.addEventListener("input", (e) => {
  searchAction(e.target.value.trim());
});

submitEle.addEventListener("submit", (e) => {
  e.preventDefault();
  searchAction(searchInput.value);
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
