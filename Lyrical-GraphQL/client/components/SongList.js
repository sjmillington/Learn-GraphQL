import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SongList = props => {

  if (props.data.loading) { return <div>Loading...</div>}

  return (
    <ul className="collection">
      { props.data.songs.map(song => (
            <li key={song.id} className="collection-item">
              {song.title}
            </li>
          )
        )}
    </ul>
  )
  
}

const query = gql`
  {
    songs {
      title,
      id
    }
  }
`

export default graphql(query)(SongList);