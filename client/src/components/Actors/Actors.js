import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActors,getMovies,validateMovies } from '../../store/actions/actor'
import {
    Container,
    } from 'reactstrap';
import {
    getActorIdByName,
    getActorNameById,
    getMoviesWithBothActors,
    getMovieTitleById,
    getActorsThatPlayedWithTwoActors} from './logic';

class Actors extends Component {


    state = {
        actor1: "Nicolas Cage",
        actor2: "Keanu Reeves",
        validateStatus: true
    };


    componentDidUpdate(prevProps, prevState){

        if(this.actorReducerIsMounted() && this.state.validateStatus){
            this.setState({
                validateStatus: false
            });
            this.props.validateMovies(this.getActorsList());
        }
    }

    componentWillMount() {

        //maybe use a promise to call get actors and movies then validate data
        //then set validation to true if component changes
        this.props.getActors();
        this.props.getMovies();




    }

    // componentWillMount() {}

    isEmpty = (value) => {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    };

    getActors = () =>  {
        if (this.actorReducerIsMounted()) {
            let actorsList = this.getActorsList();
            return actorsList.map((element, pos) => {
                return (<div key={pos}>{element.name}</div>)
            });
        }
    };

    actorReducerIsMounted = () => {
        return (!this.isEmpty(this.props.actorsReducer.actors) && !this.isEmpty(this.props.actorsReducer.movies))
    };


    getActorsList = () => {

        let formatData = [];

        if(this.actorReducerIsMounted()) {
            let actor_id_1 = getActorIdByName(this.props.actorsReducer.actors, this.state.actor1);
            let actor_id_2 = getActorIdByName(this.props.actorsReducer.actors, this.state.actor2);

            let actorsIdsBoth = getActorsThatPlayedWithTwoActors(this.props.actorsReducer.movies, actor_id_1, actor_id_2);

            actorsIdsBoth.forEach((id) => {
                let actor_obj = {
                    name: getActorNameById(this.props.actorsReducer.actors, id),
                };
                //getMoviesWithBothActors returns an array of movieIds so this converts that id into an array of names
                actor_obj.KRMovies = getMoviesWithBothActors(this.props.actorsReducer.movies, actor_id_2, id).map((element) => getMovieTitleById(this.props.actorsReducer.movies, element));
                actor_obj.NCMovies = getMoviesWithBothActors(this.props.actorsReducer.movies, actor_id_1, id).map((element) => getMovieTitleById(this.props.actorsReducer.movies, element));
                formatData.push(actor_obj);
            });
        }
        return formatData;
    };

    render() {
        return (
            <div color={"dark"} className={"mb-5"}>
                <Container>
                    <h4>{this.state.actor1} and {this.state.actor2}</h4>
                    <h3>List of Actors</h3>
                    <div>
                        {this.getActors()}
                    </div>

                    <h5>Validation Response</h5>
                    <div>
                        {this.props.actorsReducer.validationStatus}
                    </div>

                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    actorsReducer:state.actorReducer
});
const mapDispatchToProps = (dispatch) => ({
    getActors: () => dispatch(getActors()),
    getMovies: () => dispatch(getMovies()),
    validateMovies: (data) => dispatch(validateMovies(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
