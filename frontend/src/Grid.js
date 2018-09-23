import React, { Component } from 'react';
import Headlines from './Headlines';

var myStyle = {
  display: 'inline',
}

var center = {
  marginTop: '125px',
}

class Grid extends Component {

  constructor(props) {
    super(props)
  }

  renderRow(row, index) {
    return (
      <div className="row">
      <p style={center}>Topics</p>
      {row.col.map(
        (col) => {
          return (
            this.renderCol(index)
          )
        }
      )}
      </div>
    )
  }

  renderCol(index) {
    return (
      <div className="col-sm">
          {index == 0 &&
            <p style={myStyle}>Sources</p>
          }
        <Headlines linkText={"Insert Headline here"} linkImg={"https://d262ilb51hltx0.cloudfront.net/max/800/1*uTAT1bayI6ek6esb-BcZhg.jpeg"}/>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
      {this.props.row.map(
        (row, index) => {
          return (this.renderRow(row,index))
        }
      )}
      </div>
    )
  }
}





export default Grid;
