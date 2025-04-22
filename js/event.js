import { fetchTopRatedMovies, fetchPopularMovies, searchMovies, searchPerson } from "./api.js"
import { renderError, renderMovies, renderPeople } from "./render.js"

const resultContainer = document.querySelector("#results");

//Funktion som initialerar alla eventlisteners
export function initListeners(){
    const top10Btn = document.querySelector("#topRated");
    const popularBtn = document.querySelector("#popular");
    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchInput");

    //Eveentlistener för top10 knapp
    top10Btn.addEventListener("click", async() => {
        resultContainer.innerHTML = ""

        const movieTitle = document.createElement("h2")
        movieTitle.innerText = "Top 10 filmer: "
        resultContainer.append(movieTitle)

        const movies = await fetchTopRatedMovies()
        renderMovies(movies, resultContainer, true)
    })

    //Eventlistener för populär knappen
    popularBtn.addEventListener("click", async() => {
        resultContainer.innerHTML = ""

        const movieTitle = document.createElement("h2")
        movieTitle.innerText = "Populära filmer just nu: "
        resultContainer.append(movieTitle)

        const movies = await fetchPopularMovies()
        renderMovies(movies, resultContainer, true)
    })

    //Eventlistener för sök
    searchForm.addEventListener("submit", async(event) => {
        event.preventDefault();
        resultContainer.innerHTML = "<h1>LADDAR...</h1>"
        renderError("")

        const searchQuery = searchInput.value.trim();
        
        if(searchQuery.length === 0){
            renderError("Vänligen fyll i sökrutan för att söka");
            return;
        }

        const [movies, people] = await Promise.all([
            searchMovies(searchQuery),
            searchPerson(searchQuery)
        ]);

        if(movies.length === 0 && people.length === 0){
            renderError("Din sökning gav inget resultat, prova söka på något annat!")
        }
        
        resultContainer.innerHTML = ""

        if(movies.length > 0){
            const movieTitle = document.createElement("h2")
            movieTitle.innerText = `Filmer som matchar "${searchQuery}": `
            resultContainer.append(movieTitle)
            renderMovies(movies, resultContainer, false)
        }
        if(people.length > 0){
            const peopleTitle = document.createElement("h2")
            peopleTitle.innerText = `Personer som matchar "${searchQuery}": `
            resultContainer.append(peopleTitle)
            renderPeople(people, resultContainer)
        }
    })

    //Lyssnar efter klick på hela dokumentet men validerar det för att se om det var "känd för" knappen som trycktes.
    //Eventlistener för "känd för"
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("toggleProjects")) {
          const button = event.target;
          const projectContainer = button.nextElementSibling;
      
          if (!projectContainer) return;
      
          const isVisible = projectContainer.style.display === "block";
          projectContainer.style.display = isVisible ? "none" : "block";
      
          button.innerText = isVisible ? "Känd för" : "Dölj kända projekt";
        }
      });
      
}
