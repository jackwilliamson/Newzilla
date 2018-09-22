import React, { Component } from 'react';
import Headlines from './Headlines';

class Grid extends Component {

  constructor(props) {
    super(props)
  }

  renderRow(row) {
    return (
      <div className="row">
      {row.col.map(
        (col) => {
          return (this.renderCol())
        }
      )}
      </div>
    )
  }

  renderCol() {
    return (
      <div className="col-sm">
        <Headlines linkText={"Insert Headline here"} linkImg={false}/>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
      {this.props.row.map(
        (row) => {
          return (this.renderRow(row))
        }
      )}
      </div>
    )
  }
}





export default Grid;
