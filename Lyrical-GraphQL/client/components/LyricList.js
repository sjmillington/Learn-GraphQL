import React, { Component } from 'react';
import likeLyric from '../mutations/likeLyric';
import { graphql } from 'react-apollo';

class LyricList extends Component {

  like(id){
    this.props.mutate({
      variables: { id }
    })
  }

  renderLyrics(){
    return this.props.lyrics.map(({content, id, likes}) => {
      return <li key={id} className="collection-item">
         {content}
         <div className="vote-box">
          <i 
            className="material-icons"
            onClick={() => this.like(id)}
            >
              thumb_up
          </i>
          {likes}
         </div>
         
         </li>
    })
  }

  render(){
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

export default graphql(likeLyric)(LyricList)
