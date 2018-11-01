import axios from 'axios';
import {GET_ACTORS,GET_MOVIES,VALIDATE_MOVIES} from './constants';

const header_value = '557F16AA-95FF-43FC-A21E-02131E3BE202';

export const getActors = () => dispatch => {
    axios
        .get('https://ceamovies.azurewebsites.net/api/actors',{headers: {'x-chmura-cors': header_value}})
        .then(res => {
            dispatch({
                type:GET_ACTORS,
                //data that comes in from the back end which is from the url
                payload: res.data
            });
        })
        .catch(e => {
            console.log(e);
        });
};

export const getMovies = () => dispatch => {
    axios
        .get('https://ceamovies.azurewebsites.net/api/movies',{headers: {'x-chmura-cors': header_value}})
        .then(res => {
            dispatch({
                type:GET_MOVIES,
                //data that comes in from the back end which is from the url
                payload: res.data
            });
        })
        .catch(e => {
            console.log(e);
        });
};

export const validateMovies = (data) => dispatch => {

    axios
        .post('https://ceamovies.azurewebsites.net/api/validation',data,{headers: {'x-chmura-cors':header_value}})
        .then(res => {
            dispatch({
                type:VALIDATE_MOVIES,
                payload: res.status
            });
        })
        .catch(e => {
            console.log(e);
        });
};