import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';
import mutation from '../mutations/addSong';

class SongCreate extends Component {

  constructor(props){
    super(props);
    this.state = {title: ''};
  }

  onSubmit(event){
    event.preventDefault();
    
    console.log(this.props)
    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => {
      hashHistory.push('/');
    }).catch((err) => {
      console.log(err);
    })
  }

  render(){
    return (
      <div>
        <Link
          to="/"
        >Back</Link>
        <h3>Create a new Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}> 
          <label>Song Title:</label>    
          <input value={this.state.title}
           placeholder="Enter a title" 
           onChange={e=> this.setState({title: e.target.value})}/>
        </form>
      </div>
    )
  }
  
}

export default graphql(mutation)(SongCreate);
