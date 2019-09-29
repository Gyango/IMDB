import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Router, Route, Link } from "react-router-dom";

const urlForPopular = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/discover/movie?api_key=a787ed25d3a7aef96d3079f0269df80b&language=en-US&sort_by=popularity.desc';
const urlForUpcoming = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/upcoming?api_key=a787ed25d3a7aef96d3079f0269df80b&region=US';
const urlForSearch = "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/movie?api_key=a787ed25d3a7aef96d3079f0269df80b&query="

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
       <Link to={"/movies/" + this.props.id}>
        <img src={"https://image.tmdb.org/t/p/w342/" + movie.backdrop_path} />
       </Link>
      <div className="info">
         <div className="original_title">{movie.original_title}</div>
         <div className="overview">{movie.overview}</div>
         <div className="popularity">Popularity: {movie.popularity}</div>
       </div>
    	</div>
    );
  }
}


class MainMenu extends React.Component {

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
      <NavigationBar populateMovies={this.populateMovies}/>
      <MovieList movies={this.state.movies}/>
      This is a sample stateful and server-side rendered React IMDB application.
    </div>
    );
  }
}

export class App extends React.Component {

  render()
  {
    return (
    <div>
      <MainMenu/>
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
    this.props.populateMovies(resp.data);
  };

  async searchMovies(movieName){
    console.log("Search function param: " + movieName);
    const resp = await axios.get(urlForSearch +  movieName);
    console.log(resp.data);
    this.props.populateMovies(resp.data);
  };

    state = { movieType: 'Popular'};

render(){
    return(
      <ul>
        <li className="dropdown">
        <form>
          <a className="dropbtn">{this.state.movieType}</a>
          <div className="dropdown-content">
            <a onClick={() => this.newHandleSubit(urlForPopular, 'Popular')}>Popular</a>
            <a onClick={() => this.newHandleSubit(urlForUpcoming, 'Upcoming')}>Upcoming</a>
          </div>
          </form>
        </li>
        <li>
            <input ref="search" type="search" placeholder="Movie name" />
            <button onClick={() => this.searchMovies(this.refs.search.value)}>Search</button>
        </li>
      </ul>
    );
  }


}
