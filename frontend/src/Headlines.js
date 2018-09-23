import React, { Component } from 'react';
import temp from './temp.svg';

var styleA = {
  height: '225px',
  width: '100%',
  display: 'block',
};

function Headlines(props) {
  return (
    <div className="zoomTarget">
      <div className="card mb-4 shadow-sm">
          <img className="card-img-top" alt="Thumbnail [100%x225]" style={styleA} src={props.linkImg || temp} data-holder-rendered="true"/>
              <div className="card-body">
                  <a className="card-text">{props.linkText}</a>
                <div className="d-flex justify-content-end">
                    <small className="text-muted">9 mins</small>
                </div>
              </div>
      </div>
    </div>
    );
}

export default Headlines;
