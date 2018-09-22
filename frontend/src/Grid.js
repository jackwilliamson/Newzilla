import React, { Component } from 'react';

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
        One of three columns
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
