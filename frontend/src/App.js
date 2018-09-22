import React, { Component } from 'react';
import Grid from './Grid.js';
import logo from './logo.svg';
import './App.css';

var pass = {
  row: [
    {
      col: [1,2,3,4]
    },
    {
      col: [1,2,3,4]
    }
  ]

}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Grid row = {pass.row}/>
        </div>
      </div>
    );
  }
}

export default App;
