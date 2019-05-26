import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'

const urlForPopular = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/popular?api_key=a787ed25d3a7aef96d3079f0269df80b&region=en-US';
const urlForUpcoming = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/upcoming?api_key=a787ed25d3a7aef96d3079f0269df80b&region=US';

const MovieList = (props) => (
  <div>
    {props.movies.map(movie => <Movie key={movie.id} {...movie}/>)}
  </div>
)

class Movie extends React.Component {
	render() {
  	const movie = this.props;
  	return (
    	<div className="movieEntry">
      <img src={"https://image.tmdb.org/t/p/w342/" + movie.backdrop_path} />
      <div className="info">
         <div className="original_title">{movie.original_title}</div>
         <div className="overview">{movie.overview}</div>
         <div className="popularity">{movie.popularity}</div>
       </div>
    	</div>
    );
  }
}

export class App extends React.Component {

  state = {
    movies: [],
  };

  populateMovies = (moviesData) => {
    this.setState({movies : moviesData.results});
    console.log(moviesData.results);
  };

  render()
  {
    return (
    <div>
      <h1>IMDB</h1>
      <NavigationBar onSubmit={this.populateMovies}/>
      <MovieList movies={this.state.movies}/>
      This is a sample stateful and server-side rendered React IMDB application.
    </div>
    );
  }
}

class NavigationBar extends React.Component{

  async newHandleSubit(url, type){
    console.log("Sync function param: " + url + " " +type);
    this.setState({movieType: type})
    const resp = await axios.get(url);
    console.log(resp.data);
    this.props.onSubmit(resp.data);
  };

    state = { movieType: 'Popular'};

render(){
    return(
      <ul>
        <li className="dropdown">
        <form>
          <a href="javascript:void(0)" className="dropbtn">{this.state.movieType}</a>
          <div className="dropdown-content">
            <a onClick={() => this.newHandleSubit(urlForPopular, 'Popular')}>Popular</a>
            <a onClick={() => this.newHandleSubit(urlForUpcoming, 'Upcoming')}>Upcoming</a>
          </div>
          </form>
        </li>
      </ul>
    );
  }


}
