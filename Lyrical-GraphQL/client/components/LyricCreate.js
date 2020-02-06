import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import addLyricToSong from '../mutations/addLyricToSong';

class LyricCreate extends Component {

  constructor(props) {
    super(props);
    this.state = { content: ''};
  }

  onSubmit(event){
    event.preventDefault();
    
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    })
    this.setState({content: ''})
  }

  render(){
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input 
          value={this.state.content} 
          onChange={(e) => this.setState({content: e.target.value})}
        />
      </form>
    )
  }
}

export default graphql(addLyricToSong)(LyricCreate);