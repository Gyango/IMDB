import React, { useState } from 'react';
import axios from 'axios';

const urlForPopular = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/popular?api_key=a787ed25d3a7aef96d3079f0269df80b';

const Actors = (props) => (
  <div>
    {props.actors.map(actor => <Actor key={actor.cast_id} {...actor}/>)}
  </div>
)

class Actor extends React.Component {
	render() {
  	const actor = this.props;
  	return (
    	<div>
          <div>Actor id: {this.props.cast_id}</div>
    	</div>
    );
  }
}

export class MovieDetail extends React.Component {
  state = {
    movie: null,
    actors: []
  }

  async componentDidMount() {
    const { match: { params } } = this.props;

    console.log("MovieID " + params.movieId);
    let movieId = this.props.match.params.movieId;
    var url = "https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/" + params.movieId + "?api_key=a787ed25d3a7aef96d3079f0269df80b";

    console.log("url for movie" +url);
    const resp = await axios.get(url);

    var urlForActors = "https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/" + params.movieId +  "/casts?api_key=a787ed25d3a7aef96d3079f0269df80b";
    console.log("url for movie cast " +urlForActors);

    const respCast = await axios.get(urlForActors);

    console.log("Movie data:");
    console.log(resp.data);
    console.log("Movie cast data:")
    console.log(respCast.data.cast);
    this.setState({movie : resp.data});
    this.setState({actors : respCast.data.cast});
}


  render()
  {
    return (
      <div className="movieDetail">
          {this.state && this.state.movie &&
            <div>
              <div className="original_title">{this.state.movie.original_title}</div>
              <div className="column">
                <img src={"https://image.tmdb.org/t/p/w342/" + this.state.movie.backdrop_path} />
                <div>
                  <div className="overview">{this.state.movie.overview}</div>
                  <div className="popularity">Popularity: {this.state.movie.popularity}</div>
                </div>
              </div>
              <Actors actors={this.state.actors}/>
            </div>
          }
       </div>
    );
  }
}
