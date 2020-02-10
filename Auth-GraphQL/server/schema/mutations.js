const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const UserType = require('./types/user_type');
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email:  { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, { email, password }, req){
        return AuthService.signup({ email, password, req})
      }
    },
    logout: {
      type: UserType,
      resolve(_, args, req){
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType, 
      args: {
        email: { type: GraphQLString},
        password: { type: GraphQLString}
      },
      resolve(_, { email, password}, req){
        return AuthService.login({email, password, req})
      }
    }
  }

})

module.exports = mutation;