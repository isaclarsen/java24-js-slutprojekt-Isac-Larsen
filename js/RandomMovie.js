export class RandomMovie{
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.maxPages = 500;

        //Attribut
        this.title = "";
        this.description = "";
        this.poster = "";
        this.releaseDate = "";
        this.popularity = 0;
        this.trailer = "";
    }


 async fetchRandomMovie(){
    const randomPage = Math.floor(Math.random() * this.maxPages) + 1;
    try{
        const res = await fetch(`${this.baseUrl}discover/movie?api_key=${this.apiKey}&page=${randomPage}`);
        const data = await res.json();
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        
        const trailerUrl = await this.fetchMovieTrailer(randomMovie.id);

        this.title = randomMovie.title;
        this.description = randomMovie.overview;
        this.poster = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
        this.releaseDate = randomMovie.release_date;
        this.popularity = randomMovie.popularity;
        this.trailer = trailerUrl;

    }catch(error){
        throw new Error("Något internt fel har inträffat, vänligen prova igen!");
    }
}

//Metod för att hämta trailer på film
async fetchMovieTrailer(movieId){
    const res = await fetch(`${this.baseUrl}movie/${movieId}/videos?api_key=${this.apiKey}`);
    const data = await res.json();
    
    const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    }
}