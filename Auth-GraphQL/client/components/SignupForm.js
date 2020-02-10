import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { hashHistory } from 'react-router';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';

class SignupForm extends Component {

  constructor(props) {
    super(props)
    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    //this.props // old
    //nextProps // next props in place when component re-renders

    if(!this.props.data.user && nextProps.data.user){
      //redirect to dashboard!
      hashHistory.push('/dashboard');
    }

  }

  //refetchQueries + .then are simultaniously executed, causing a race condition...... GOTCHA!
  onSubmit({ email, password}) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      this.setState({errors: res.graphQLErrors.map(err => err.message)})
    })
  }

  render(){
    return (
      <div>
        <h3>Sign up</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);