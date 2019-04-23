import React, { useState } from 'react';
import axios from 'axios';

const url = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/discover/movie?api_key=a787ed25d3a7aef96d3079f0269df80b&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22';

const MovieList = (props) => (
  <div>
{props.movies.map(profile => <Movie key={movie.id} {...profile}/>)}
  </div>
)

class Movie extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="movie">
    	  <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
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
    console.log('populating data');
    this.setState({movies : moviesData});
    console.log(moviesData);
  };

  render()
  {
    return (
    <div>
      <h1>IMDB</h1>
      <NavigationBar onClick={this.populateMovies}/>
      This is a sample stateful and server-side rendered React IMDB application.
    </div>
    );
  }
}


class NavigationBar extends React.Component{

    state = { movieType: 'Popular'};

    handleSubmit = async (event) => {
      console.log('triggered handle submit');
      	event.preventDefault();
        const resp = await axios.get(url);
        console.log('triggered handle submit finished');
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
