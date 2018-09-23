import React, { Component } from 'react';
import Headlines from './Headlines';
import axios from 'axios';

var myStyle = {
  display: 'inline',
}

var center = {
  marginTop: '125px',
}


class Grid extends Component {

  componentDidMount() {
    axios.get('http://192.168.1.126:8081/topics').then(res => {
      const newsArticles = res.data
      this.setState({newsArticles})
      console.log(this.state)
      console.log(res)
    })
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
      {this.state.newsArticles.map(
        (article, index) => {
          return (this.renderRow(article, index))
        }
      )}
      </div>
    )
  }
}


// class FetchDemo extends React.Component {
//   state = {
//     posts: []
//   }
//
//   componentDidMount() {
//     axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
//       .then(res => {
//         const posts = res.data.data.children.map(obj => obj.data);
//         this.setState({ posts });
//       });
//   }
//
//   render() {
//     return (
//       <div>
//         <h1>{`/r/${this.props.subreddit}`}</h1>
//         <ul>
//           {this.state.posts.map(post =>
//             <li key={post.id}>{post.title}</li>
//           )}
//         </ul>
//       </div>
//     );
//   }
// }


export default Grid;
