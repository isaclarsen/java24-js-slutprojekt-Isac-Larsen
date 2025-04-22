import { renderError } from "./render.js";

const apiKey = "bf3184b873a99a201717b3a23a6c45a2";
const baseUrl = "https://api.themoviedb.org/3/";
// https://api.themoviedb.org/3/search/movie?query=titanic&api_key=bf3184b873a99a201717b3a23a6c45a2

//Hämta top filmer från API
export async function fetchTopRatedMovies(){
    try{
        const res = await fetch(`${baseUrl}movie/top_rated?api_key=${apiKey}`);
        if(!res.ok){
            if(res.status === 404){
                throw new Error("Det gick inte att ladda in filmerna, prova igen");
            }else{
                throw new Error("Något internt fel har inträffat, vänligen prova igen!");
            }
        }
        const data = await res.json();
        return data.results.slice(0, 10);
    }catch(error){
        renderError(error);
    }
}

//Hämtar populära filmer från API
export async function fetchPopularMovies(){
    try{
        const res = await fetch(`${baseUrl}movie/popular?api_key=${apiKey}`);
        if(!res.ok){
            if(res.status === 404){
                throw new Error("Det gick inte att ladda in filmerna, prova igen");
            }else{
                throw new Error("Något internt fel har inträffat, vänligen prova igen!");
            }
        }
        const data = await res.json();
        return data.results.slice(0, 10);
    }catch(error){
        renderError(error);
    }
}

//Hämtar filmer genom sök query
export async function searchMovies(searchQuery){
    try {
        const res = await fetch(`${baseUrl}search/movie?query=${searchQuery}&api_key=${apiKey}&page=1`)
        const data = await res.json()
        return data.results
    }catch(error){
        return [];
    }
}

export async function searchPerson(searchQuery){
    try {
        const res = await fetch(`${baseUrl}search/person?query=${searchQuery}&api_key=${apiKey}&page=1`)
        const data = await res.json()
        return data.results
    }catch(error){
        return [];
    }
}