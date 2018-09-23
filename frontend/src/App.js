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
      <div className="jumbotron jumbotron-fluid">
          <div className="container-fluid">
              <h1 className="display-4">Newzilla</h1>
              <p className="lead">Find more persectives on your news. Click on a source to read the article</p>
          </div>
      </div>
        <div>
          <Grid row = {pass.row}/>
        </div>
      </div>
    );
  }
}

export default App;
