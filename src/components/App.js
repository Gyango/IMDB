import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown'

const url = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/discover/movie?api_key=a787ed25d3a7aef96d3079f0269df80b&primary_release_date.gte=1999-09-15&primary_release_date.lte=2014-10-22';

const MovieList = (props) => (
  <div>
    {props.movies.map(movie => <Movie key={movie.id} {...movie}/>)}
  </div>
)

class Movie extends React.Component {
	render() {
  	const movie = this.props;
  	return (
    	<div className="movie">
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

    state = { movieType: 'Popular'};

    handleSubmit = async (event) => {
      	event.preventDefault();
        const resp = await axios.get(url);
        this.props.onSubmit(resp.data);
      };


render(){
    return(
      <ul>
        <li className="dropdown">
        <form onClick={this.handleSubmit}>
          <a href="javascript:void(0)" className="dropbtn">{this.state.movieType}</a>
          <div className="dropdown-content">
            <a onClick={() => this.setState({movieType: 'Popular'})}>Popular</a>
            <a onClick={() => this.setState({movieType: 'Upcoming'})}>Upcoming</a>
          </div>
          </form>
        </li>
      </ul>
    );
  }


}
