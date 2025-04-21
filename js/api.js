import { renderError } from "./render.js";

const apiKey = "bf3184b873a99a201717b3a23a6c45a2";
const baseUrl = "https://api.themoviedb.org/3/";

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