import React, { Component } from 'react';
import likeLyric from '../mutations/likeLyric';
import { graphql } from 'react-apollo';

class LyricList extends Component {

  like(id, likes){
    this.props.mutate({
      variables: { id },
      optimisticResponse: { //this HAS to be the same format as the expected response. data.likeLyric..
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes+1
        }
      }
    })
  }

  renderLyrics(){
    return this.props.lyrics.map(({content, id, likes}) => {
      return <li key={id} className="collection-item">
         {content}
         <div className="vote-box">
          <i 
            className="material-icons"
            onClick={() => this.like(id, likes)}
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
