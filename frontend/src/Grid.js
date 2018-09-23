import React, { Component } from 'react';
import axios from 'axios';

class Grid extends Component {

  componentDidMount() {
    axios.get('http://192.168.1.126:8081/topics').then(res => {
      const newsArticles = res.data
      this.setState({newsArticles})
      console.log(this.state)
      console.log(res)
    })
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
      {this.state.newsArticles.map(
        (article) => {
          return (this.renderRow(article))
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
