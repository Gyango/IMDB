import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

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
    	<div className="actorList">
          <div className="actorProfilePic"><img src={"https://image.tmdb.org/t/p/w342/" + this.props.profile_path}/></div>
          <div>{this.props.character} (played by {this.props.name})</div>
    	</div>
    );
  }
}

export class MovieDetail extends React.Component {
  state = {
    movie: null,
    actors: [],
    trailerId: ""
  }

  async componentDidMount() {
    const  params  = this.props.match.params;

    console.log("MovieID " + params.movieId);

    var url = "https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/" + params.movieId + "?api_key=a787ed25d3a7aef96d3079f0269df80b";
    console.log("url for movie" +url);
    const resp = await axios.get(url);

    var urlForActors = "https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/" + params.movieId +  "/casts?api_key=a787ed25d3a7aef96d3079f0269df80b";
    console.log("url for movie cast " +urlForActors);
    const respCast = await axios.get(urlForActors);

    var urlForTrailer = "https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/" + params.movieId + "/videos?api_key=a787ed25d3a7aef96d3079f0269df80b"
    console.log("url fortrailers " + urlForTrailer);
    const trailers = await axios.get(urlForTrailer);

    console.log("Movie data:");
    console.log(resp.data);
    console.log("Movie cast data:")
    console.log(respCast.data.cast);
    console.log("Trailers:")
    console.log(trailers.data.results);

    this.setState({movie : resp.data});
    this.setState({actors : respCast.data.cast});
    this.setState({trailerId : trailers.data.results[0].key});

    console.log(this.state.trailerId);
}


  render()
  {
    return (
      <div className="movieDetail">
          {this.state && this.state.movie &&
            <div>
              <div className="original_title">{this.state.movie.original_title}</div>
              <div className="column">
                <div className="backdropPic">
                  <img src={"https://image.tmdb.org/t/p/w342/" + this.state.movie.backdrop_path} />
                </div>
                <div>
                  <div className="overview">{this.state.movie.overview}</div>
                  <div className="releaseDate">Release date: {this.state.movie.release_date}</div>
                  <div className="genres">
                  Genres:
                  {this.state.movie.genres.map(function(genre){
                    return genre.name;
                  }).join(", ")}
                  </div>
                  <div className="popularity">Popularity: {this.state.movie.popularity}</div>
                </div>
              </div>
              <div class="trailerVideoContainer">
                <iframe src={"https://www.youtube.com/embed/" + this.state.trailerId}/>
              </div>
              <Actors actors={this.state.actors} />
            </div>
          }
       </div>
    );
  }
}
