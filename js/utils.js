//Personers namn
//A>Z
export function sortPeopleByNameAsc(list) {
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
}
//Z>A
export function sortPeopleByNameDesc(list) {
    return [...list].sort((a, b) => b.name.localeCompare(a.name));
}

//Filmens titel
//A>Z
export function sortMovieByNameAsc(list) {
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
}
//Z>A
export function sortMovieByNameDesc(list) {
    return [...list].sort((a, b) => b.title.localeCompare(a.title));
}

//Score
//Lågt > Högt
export function sortScoreAsc(list) {
    return [...list].sort((a, b) => a.popularity - b.popularity);
}
//Högt > Lågt
export function sortScoreDesc(list) {
    return [...list].sort((a, b) => b.popularity - a.popularity);
}
