import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import { App } from 'components/App';
import { MovieDetail } from 'components/MovieDetail';

import '../styles/index.scss';
import '../styles/AppStyles.scss';
import '../styles/MovieDetailStyles.scss';


const routing = (

  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/movies/:movieId"  component={MovieDetail} />
    </div>
  </Router>
)

ReactDOM.hydrate(
  routing,
  document.getElementById('root')
);
