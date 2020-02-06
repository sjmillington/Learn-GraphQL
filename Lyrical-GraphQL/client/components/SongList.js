import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import deleteSong from '../mutations/deleteSong';

const onSongDelete = (id, props) => {
  props.mutate({ variables: { id }})
    .then(() => props.data.refetch())
}

const SongList = props => {

  if (props.data.loading) { return <div>Loading...</div>}

  return (
    <div>
      <ul className="collection">
        { props.data.songs.map(({id, title}) => (
              <li key={id} className="collection-item">
                <Link to={`/songs/${id}`}>{title}</Link>
                <i
                  className="material-icons"
                  onClick={() => onSongDelete(id, props)}
                > 
                  delete
                </i>
              </li>
            )
          )}
      </ul>
      <Link
        to="/songs/new"
        className="btn-floating btn-large red right"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>

  )
}


export default graphql(deleteSong)(
  graphql(query)(SongList)
)