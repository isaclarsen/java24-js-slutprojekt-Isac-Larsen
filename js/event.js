import { fetchTopRatedMovies, fetchPopularMovies, searchMovies, searchPerson } from "./api.js";
import { RandomMovie } from "./RandomMovie.js";
import { renderError, renderMovies, renderPeople, renderRandomMovie } from "./render.js";
import { sortMovieByNameAsc, sortMovieByNameDesc, sortScoreAsc, sortScoreDesc,sortPeopleByNameAsc, sortPeopleByNameDesc  } from "./utils.js";

const resultContainer = document.querySelector("#results");
let currentMovies = [];
let currentPeople = [];


//Funktion som initialerar alla eventlisteners
export function initListeners(){
    const top10Btn = document.querySelector("#topRated");
    const popularBtn = document.querySelector("#popular");
    const randomBtn = document.querySelector("#random");
    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchInput");
    const sortContainer = document.querySelector("#sortContainer");

/**-------EVENTLISTENER TOP10 KNAPP -------- */
    top10Btn.addEventListener("click", async() => {
        resultContainer.innerHTML = "";
        sortContainer.classList = "";
        renderError("");

        const movieTitleEl = document.createElement("h2");
        movieTitleEl.innerText = "Top 10 filmer: ";
        resultContainer.append(movieTitleEl);
        try{
            const movies = await fetchTopRatedMovies();
            currentMovies = [...movies];
            renderMovies(currentMovies, resultContainer, true);
        }catch(error){
            renderError(error);
        }
        
    })

/**-------EVENTLISTENER POPULÄR KNAPP -------- */
    popularBtn.addEventListener("click", async() => {
        resultContainer.innerHTML = "";
        sortContainer.classList = "";
        renderError("");

        const movieTitleEl = document.createElement("h2");
        movieTitleEl.innerText = "Populära filmer just nu: ";
        resultContainer.append(movieTitleEl);
        
        try{
            const movies = await fetchPopularMovies();
            currentMovies = [...movies];
            renderMovies(currentMovies, resultContainer, true);
        }catch(error){
            renderError(error);
        }

    })

/**-------EVENTLISTENER SÖK-------- */
    searchForm.addEventListener("submit", async(event) => {
        event.preventDefault();
        renderError("");
        sortContainer.classList = "";
        resultContainer.innerHTML = "<h1>LADDAR...</h1>";

        const searchQuery = searchInput.value.trim();
        
        if(searchQuery.length === 0){
            renderError("Vänligen fyll i sökrutan för att söka");
            return;
        }
        try{
            const [movies, people] = await Promise.all([
                searchMovies(searchQuery),
                searchPerson(searchQuery)
            ]);
            if(movies.length === 0 && people.length === 0){
                renderError("Din sökning gav inget resultat, prova söka på något annat!");
            }
            
            resultContainer.innerHTML = "";
    
            if(movies.length > 0){
                const movieTitleEl = document.createElement("h2");
                movieTitleEl.innerText = `Filmer som matchar "${searchQuery}": `;
                resultContainer.append(movieTitleEl);
                currentMovies = [...movies];
                renderMovies(currentMovies, resultContainer, false);
            }
            if(people.length > 0){
                const peopleTitleEl = document.createElement("h2");
                peopleTitleEl.innerText = `Personer som matchar "${searchQuery}": `;
                resultContainer.append(peopleTitleEl);
                currentPeople = [...people];
                renderPeople(currentPeople, resultContainer);
            }
        }catch(error){
            renderError(error);
        }

    })


/**-------EVENTLISTENER SORTERING -------- */
      sortSelect.addEventListener("change", event => {
        event.preventDefault();
    
        resultContainer.innerHTML = "";
        
        if (currentMovies.length > 0) {
            let sortedMovies = [];

            if(sortSelect.selectedIndex === 0) {
                sortedMovies = [...currentMovies];

            }else if(sortSelect.selectedIndex === 1){
                sortedMovies = sortMovieByNameAsc(currentMovies);

            }else if(sortSelect.selectedIndex === 2){
                sortedMovies = sortMovieByNameDesc(currentMovies);

            }else if(sortSelect.selectedIndex === 3){
                sortedMovies = sortScoreAsc(currentMovies);

            }else if(sortSelect.selectedIndex === 4){
                sortedMovies = sortScoreDesc(currentMovies);
            }

            const movieTitleEl = document.createElement("h2");
            movieTitleEl.innerText = `Sorterade filmer:`;
            resultContainer.append(movieTitleEl);
            renderMovies(sortedMovies, resultContainer, false);
        }
    
        if (currentPeople.length > 0) {
            let sortedPeople = [];

            if(sortSelect.selectedIndex === 0) {
                sortedPeople = [...currentPeople];

            }else if(sortSelect.selectedIndex === 1){
                sortedPeople = sortPeopleByNameAsc(currentPeople);

            }else if(sortSelect.selectedIndex === 2){
                sortedPeople = sortPeopleByNameDesc(currentPeople);

            }else if(sortSelect.selectedIndex === 3){
                sortedPeople = sortScoreAsc(currentPeople);

            }else if(sortSelect.selectedIndex === 4){
                sortedPeople = sortScoreDesc(currentPeople);
            }

            const peopleTitleEl = document.createElement("h2");
            peopleTitleEl.innerText = `Sorterade personer:`;
            resultContainer.append(peopleTitleEl);
            renderPeople(sortedPeople, resultContainer);
        }
    });

/**-------EVENTLISTENER SLUMPA FILM KNAPP -------- */   
    randomBtn.addEventListener("click", async () => {
        const randomMovie = new RandomMovie("bf3184b873a99a201717b3a23a6c45a2");
        resultContainer.innerHTML = "<h1>LADDAR...</h1>";
        sortContainer.classList.add("hidden");
      
        try {
          await randomMovie.fetchRandomMovie();
      
          resultContainer.innerHTML = "";
      
          renderRandomMovie(randomMovie, resultContainer)
        } catch (error) {
          renderError(error);
        }
      });
    
      
}
