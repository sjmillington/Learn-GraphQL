const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const endpoint = 'http://localhost:3000'

const getFromDB = (route) => {
  return axios.get(`${endpoint}${route}`)
    .then(resp => resp.data)
}

const postFromDB = (route, data) => {
  return axios.post(`${endpoint}${route}`, data)
    .then(resp => resp.data)
}

const deleteFromDB = (route, data) => {
  return axios.delete(`${endpoint}${route}`, data)
    .then(resp => resp.data)
}

const patchDB = (route, data) => {
  return axios.patch(`${endpoint}${route}`, data)
    .then(resp => resp.data)
}

//destructure
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

//order of definition matters, here.
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return getFromDB(`/companies/${parentValue.id}/users`)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: { 
      type: CompanyType,
      resolve(parentValue, args){
        return getFromDB(`/companies/${parentValue.companyId}`)
      } 
    } 
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args){
        //this is where DB access happens. can be sync, or async (return a promise)
          return getFromDB(`/users/${args.id}`)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args){
        return getFromDB(`/companies/${args.id}`)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, age}){
        return postFromDB('/users', {
          firstName,
          age
        })
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }){
        return deleteFromDB(`/users/${id}`)
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args){
        return patchDB(`/users/${args.id}`, args)
      }

    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery, 
  mutation
})

