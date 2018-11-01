
/*
 * Takes in a list and filters by name
 * returns value of actorId
 */
const getActorIdByName = (actorsList,name) => {
    return actorsList.find( obj => obj.name.toLowerCase() === name.toLowerCase()).actorId;
};

/*
 * Takes in a list and filters by id
 * returns value of name
 */
const getActorNameById = (actorsList,id) => {
    return actorsList.find( obj => parseInt(obj.actorId) === parseInt(id)).name;
};

/*
 * Takes in a list and filters by id
 * returns value of title
 */
const getMovieTitleById = (moviesList,id) => {
    return moviesList.find( obj => parseInt(obj.movieId) === parseInt(id)).title;
};


/*
 * Takes in an list and filters actors by id
 * returns an array of movieId's
 */
const getMoviesWithActorById = (moviesList,id) =>{
    return moviesList.filter( obj => { return obj.actors.find( act => act === id)}).map( x => x.movieId);
};

/*
 * Takes in an list and filters actors by id
 * returns an array of movieId's
 */
const getActorsInMovieWithActorById = (moviesList,id) =>{
    let actorsList = moviesList.filter( obj => { return obj.actors.find( act => act === id) }).map( x => x.actors);

    //Concat to flatten the multi multidimensional array
    return [].concat(...actorsList);
};

/*
 * Take's in a list and two id's and finds the intersection between
 * returns an array of movieId's
 */
const getMoviesWithBothActors = (moviesList,id1,id2) =>{
    //Readable format
    let moviesWithActor1 = getMoviesWithActorById(moviesList,id1);
    let moviesWithActor2 = getMoviesWithActorById(moviesList,id2);
    let actorsIntersect = intersection(moviesWithActor1,moviesWithActor2);
    return removeDuplicates(actorsIntersect)
};

/*
 * Take's in a list and two id's and finds the intersection between
 * returns an array of actors that have played with both id
 */
const getActorsThatPlayedWithTwoActors = (moviesList,id1,id2) =>{
    //Readable format
    let actorsWithActor1 =  getActorsInMovieWithActorById(moviesList,id1);
    let actorsWithActor2 = getActorsInMovieWithActorById(moviesList,id2);
    let actorsIntersect = intersection(actorsWithActor1,actorsWithActor2);
    return removeDuplicates(actorsIntersect)
};


const intersection = (a,b) => {
    return [a,b].reduce((a, b) => a.filter(c => b.includes(c)));
};

const removeDuplicates = (arr) => {
  return arr.filter((v, i, a) => a.indexOf(v) === i )
};

export {
    getActorIdByName,
    getActorNameById,
    getMoviesWithActorById,
    getActorsInMovieWithActorById,
    getMoviesWithBothActors,
    getMovieTitleById,
    getActorsThatPlayedWithTwoActors
};