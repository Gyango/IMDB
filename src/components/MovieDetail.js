import React, { useState } from 'react';
import axios from 'axios';

const urlForPopular = 'https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/popular?api_key=a787ed25d3a7aef96d3079f0269df80b';

export class MovieDetail extends React.Component {
  state = {
    movie: null
  }

  async componentDidMount() {
    const { match: { params } } = this.props;

    console.log("MovieID " + params.movieId);
    let movieId = this.props.match.params.movieId;
    var url = "https://cors-anywhere.herokuapp.com/http://api.themoviedb.org/3/movie/" + params.movieId + "?api_key=a787ed25d3a7aef96d3079f0269df80b";

    console.log("url " +url);
    const resp = await axios.get(url);
    console.log("data " + resp.data);
    this.setState({movie : resp.data});
}


  render()
  {
    return (
      <div className="info">
          {this.state && this.state.movie &&
            <div>
            <div className="original_title">{this.state.movie.original_title}</div>
            <div className="overview">{this.state.movie.overview}</div>
            <div className="popularity">Popularity: {this.state.movie.popularity}</div>
            </div>
          }
       </div>
    );
  }
}
