const errorContainer = document.querySelector("#errorContainer");
const errorMessage = document.querySelector("#errorMessage");




export function renderMovies(movieList, container, ordered = false){

    //Validerar om det är en ordered eller unordered lista
    const listEl = document.createElement(ordered ? "ol" : "ul");

    container.innerHTML = "";

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

export function renderPeople(){

}

//Skriver ut felmeddelande
export function renderError(error){
    errorContainer.classList = ""
    errorMessage.innerText = error
}