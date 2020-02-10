import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: []
    }
  }

  componentWillUpdate(nextProps) {
    //this.props // old
    //nextProps // next props in place when component re-renders

    if(!this.props.data.user && nextProps.data.user){
      //redirect to dashboard!
      hashHistory.push('/dashboard');
    }

  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query }]
    }).catch((res) => {
      this.setState({errors: res.graphQLErrors.map(error => error.message)});
    })
  }

  render(){
    return (
      <div>
        <h3>Log in</h3>
        <AuthForm 
          onSubmit={this.onSubmit.bind(this)} 
          errors={this.state.errors} 
        />
      </div>
    )
  }
}


//associate this component so when the query is refetched, the component will re-render.
export default graphql(query)(
  graphql(mutation)(LoginForm)
);