import {GET_ACTORS,GET_MOVIES,VALIDATE_MOVIES} from '../actions/constants'

// Testing what should i get back
// const actors = require('../../components/Actors/actors-res.json');
// const movies = require('../../components/Actors/movies-res.json');

const actorReducer = (state = [], {type, payload}) => {
    switch (type) {
        case GET_ACTORS:
            state = {
                ...state,
                actors: payload
            };
            return state;
        case GET_MOVIES:
            state = {
                ...state,
                movies: payload
            };
            return state;
        case VALIDATE_MOVIES:
            state = {
                ...state,
                validationStatus: payload
            };
            return state;
        default:
            return state;
    }
};

export default actorReducer;
