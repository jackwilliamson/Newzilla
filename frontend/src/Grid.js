import React, { Component } from 'react';
import Headlines from './Headlines';
import axios from 'axios';

var myStyle = {
  display: 'inline',
}

var center = {
  marginTop: '125px',
  width: '200px',
}


class Grid extends Component {

  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    axios.get('http://192.168.1.126:8081/topics').then(res => {
      const newsArticles = res.data
      this.setState({
        newsArticles,
        loaded: true
      })
    })
  }

  renderRow(articles, row) {
    return (
      <div className="row">
      <p style={center}>{articles.topic}</p>
      {Array.isArray(articles.sources) && articles.sources.slice(0,4).map(
        (source, index) => {
          return (
            this.renderCol(source, row, index)
          )
        }
      )}
      </div>
    )
  }

  renderCol(source, row, col) {
    return (
      <div className="col-sm">
          <p style={myStyle}>{source.source_name}</p>
          <Headlines linkText={source.title} linkImg={source.image}/>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
      {this.state.loaded && this.state.newsArticles.map(
        (article, index) => {
          return (this.renderRow(article, index))
        }
      )}
      </div>
    )
  }
}



export default Grid;
