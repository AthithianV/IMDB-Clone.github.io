import createMovieCard from "./card.js";
import { loading, results, searchResult, pageNoSection } from "../script.js";

/**Fetch the data using the search term and the page as argument and
 * if the data is successfull collected createMovieCard function
 * for each movies in data is called else Search result: 0 is displayed.
 */
export default async function loadMovies(searchTerm, page) {
  try {
    const url = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=cb638678`;
    const request = await fetch(url);
    const moviesData = await request.json();

    results.innerHTML = "";
    moviesData.Search.forEach((movie) => {
      createMovieCard(
        movie,
        results,
        document.querySelector("[movieCard]"),
        true
      );
    });

    results.appendChild(pageNoSection);

    loading.classList.add("hide");

    results.querySelector(".pageNo").textContent = page;
    results.querySelector(".resultBtns").classList.remove("hide");
    results.querySelector(".next").addEventListener("click", () => {
      page++;
      loadMovies(searchTerm, page);
    });
    results.querySelector(".prev").addEventListener("click", () => {
      page--;
      if (page > 0) {
        loadMovies(searchTerm, page);
      }
    });
  } catch (err) {
    loading.classList.add("hide");
    results.innerHTML = "";
    const zeroResult = document.createElement("h1");
    zeroResult.textContent = "Search Result: 0";
    results.appendChild(zeroResult);
    console.log(err);
    return;
  }
}
