const errorContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#errorMessage");



/**-------RENDER MOVIES -------- */
export function renderMovies(movieList, container, ordered = false){
    renderError("");

    const listEl = document.createElement(ordered ? "ol" : "ul");
    
    movieList.forEach(movie => {
        const liEl = document.createElement("li");
        const titleEl = document.createElement("h3");
        const imgEl = document.createElement("img");
        const releaseDateEl = document.createElement("p");
        const scoreEl = document.createElement("p");
        const descriptionEl = document.createElement("p");

        
        descriptionEl.classList.add("hidden");
        
        //Hover på filmens "card" för att visa description
        liEl.addEventListener("mouseover", () =>{
            descriptionEl.classList = "";
        })
        
        liEl.addEventListener("mouseleave", () => {
            descriptionEl.classList.add("hidden");
        })
        
        titleEl.innerText = movie.title;
        imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        imgEl.alt = movie.title;
        releaseDateEl.innerText = movie.release_date;
        descriptionEl.innerText = movie.overview;
        //Om score inte har något värde, skriv ut "N/A"
        scoreEl.innerText = "Score: " + (typeof movie.popularity === "number" ? movie.popularity.toFixed(2) : "N/A");

        liEl.append(titleEl, imgEl, releaseDateEl, descriptionEl, scoreEl);
        listEl.append(liEl);
    });
    container.appendChild(listEl);
}
/**-------RENDER RANDOM MOVIE -------- */
export function renderRandomMovie(randomMovie, container){
    renderError("");

    const cardEl = document.createElement("div");
    const titleEl = document.createElement("h3");
    const imgEl = document.createElement("img");
    const releaseDateEl = document.createElement("p");
    const scoreEl = document.createElement("p");
    const descriptionEl = document.createElement("p");
    const trailerEl = document.createElement("a");

    descriptionEl.classList.add("hidden");
    cardEl.classList.add("randomMovieContainer");

    cardEl.addEventListener("mouseover", () =>{
        descriptionEl.classList = "";
    })
    
    cardEl.addEventListener("mouseleave", () => {
        descriptionEl.classList.add("hidden");
    })

    titleEl.innerText = randomMovie.title;
    imgEl.src = randomMovie.poster;
    imgEl.alt = randomMovie.title;
    releaseDateEl.innerText = randomMovie.releaseDate;
    scoreEl.innerText = "Score: " + (typeof randomMovie.popularity === "number" ? randomMovie.popularity.toFixed(2) : "N/A");
    descriptionEl.innerText = randomMovie.description;

    cardEl.append(titleEl, imgEl, releaseDateEl, scoreEl, descriptionEl);

    if (randomMovie.trailer) {
        trailerEl.href = randomMovie.trailer;
        trailerEl.innerText = "Spela trailer";
        trailerEl.target = "_blank";
        cardEl.append(trailerEl);
    }

    container.append(cardEl);
}

/**-------RENDER PEOPLE -------- */
export function renderPeople(peopleList, container){
    const listEl = document.createElement("ul");

    peopleList.forEach(person => {
        const liEl = document.createElement("li");
        const nameEl = document.createElement("h3");
        const imgEl = document.createElement("img");
        const departmentEl = document.createElement("p");
        const popularityEl = document.createElement("p");
        
        nameEl.innerText = person.name;
        imgEl.src = `https://image.tmdb.org/t/p/w500${person.profile_path}`;
        imgEl.alt = person.name;
        departmentEl.innerText = person.known_for_department;
        popularityEl.innerText = person.popularity.toFixed(2);
        
        
        const toggleBtnEl = document.createElement("button");
        toggleBtnEl.classList = "toggleProjects";
        toggleBtnEl.innerText = "Känd för";

        //Toggle för personens kända verk
        toggleBtnEl.addEventListener("click", (event) => {
            if (event.target.classList.contains("toggleProjects")) {
              const button = event.target;
              const projectContainer = button.nextElementSibling;
          
              if (!projectContainer) return;
          
              const isVisible = projectContainer.style.display === "block";
              projectContainer.style.display = isVisible ? "none" : "block";
          
              button.innerText = isVisible ? "Känd för" : "Dölj kända projekt";
            }
          });
        
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("projectContainer");
        projectContainer.style.display = "none";
        
        const projectListEl = document.createElement("ul");

        person.known_for.forEach(project => {
            const projectItemEl = document.createElement("li");

            if(project.media_type === "movie"){
                projectItemEl.innerText = `Movie: ${project.title}`;
            }else if(project.media_type === "tv"){
                projectItemEl.innerText = `Tv: ${project.name}`;
            }
            
            projectListEl.append(projectItemEl);
        });
        
        projectContainer.append(projectListEl);
        liEl.append(nameEl, imgEl, departmentEl, popularityEl, toggleBtnEl, projectContainer);
        listEl.append(liEl);
    })
    container.appendChild(listEl);
}

/**-------RENDER ERROR -------- */
export function renderError(error) {
    if (!error) {
        errorContainer.classList.add("hidden");
        errorMessage.innerText = "";
    } else {
        errorContainer.classList.remove("hidden");
        errorMessage.innerText = error;
    }
}