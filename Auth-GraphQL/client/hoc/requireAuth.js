import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (WrapperComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps){
      if(!nextProps.loading && !nextProps.data.user){
        hashHistory.push('/login')
      }
    }
  
    render(){
      return <WrapperComponent {...this.props} />
    }
  }
  
  return graphql(currentUserQuery)(RequireAuth)
}

