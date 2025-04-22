const errorContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#errorMessage");




export function renderMovies(movieList, container, ordered = false){

    //Validerar om det är en ordered eller unordered lista
    const listEl = document.createElement(ordered ? "ol" : "ul");

    movieList.forEach(movie => {
        const liEl = document.createElement("li");
        const titleEl = document.createElement("h3");
        const imgEl = document.createElement("img");
        const releaseDateEl = document.createElement("p");
        const scoreEl = document.createElement("p");

        titleEl.innerText = movie.title;
        imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        imgEl.alt = movie.title;
        releaseDateEl.innerText = "Släppt: " + movie.release_date;
        scoreEl.innerText = "Score: " + movie.popularity;

        liEl.append(titleEl, imgEl, releaseDateEl, scoreEl);
        listEl.append(liEl);
    });
    container.appendChild(listEl);
}

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
        imgEl.alt = person.name
        departmentEl.innerText = person.known_for_department;
        popularityEl.innerText = person.popularity;
        
        
        const toggleBtn = document.createElement("button")
        toggleBtn.classList = "toggleProjects"
        toggleBtn.innerText = "Känd för"
        
        const projectContainer = document.createElement("div")
        projectContainer.classList.add("projectContainer");
        projectContainer.style.display = "none";
        
        const projectList = document.createElement("ul")

        person.known_for.forEach(project => {
            const projectItem = document.createElement("li");

            if(project.media_type === "movie"){
                projectItem.innerText = `Movie: ${project.title}`;
            }else if(project.media_type === "tv"){
                projectItem.innerText = `Tv: ${project.name}`;
            }
            
            projectList.append(projectItem)
        });
        
        projectContainer.append(projectList);
        liEl.append(nameEl, imgEl, departmentEl, popularityEl, toggleBtn, projectContainer);
        listEl.append(liEl);
    })
    container.appendChild(listEl)
}

//Skriver ut felmeddelande
export function renderError(error) {
    if (!error) {
        errorContainer.classList.add("hidden");
        errorMessage.innerText = "";
    } else {
        errorContainer.classList.remove("hidden");
        errorMessage.innerText = error;
    }
}