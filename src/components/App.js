import React, { useState } from 'react';

export class App extends React.Component {

  render()
  {
    return (
    <div>
      <h1>IMDB</h1>
      <NavigationBar/>
      This is a sample stateful and server-side rendered React IMDB application.
    </div>
    );
  }
}

function NavigationBar(){

    const [movieType, setType] = useState("Popular");

    return(
      <ul>
        <li class="dropdown">
          <a href="javascript:void(0)" class="dropbtn">{movieType}</a>
          <div class="dropdown-content">
            <a onClick={() => setType("Popular")}>Popular</a>
            <a onClick={() => setType("Upcoming")}>Upcoming</a>
          </div>
        </li>
      </ul>
    )

}
