import { fetchTopRatedMovies, fetchPopularMovies } from "./api.js"
import { renderMovies } from "./render.js"

const resultContainer = document.querySelector("#results");

//Funktion som initialerar alla eventlisteners
export function initListeners(){
    const top10Btn = document.querySelector("#topRated")
    const popularBtn = document.querySelector("#popular")

    top10Btn.addEventListener("click", async() => {
        const movies = await fetchTopRatedMovies()
        renderMovies(movies, resultContainer, true)
    })

    popularBtn.addEventListener("click", async() => {
        const movies = await fetchPopularMovies()
        renderMovies(movies, resultContainer, true)
    })

}
