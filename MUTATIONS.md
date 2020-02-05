## Mutations

Created in another GraphQLObjectType object. Post request done in the `resolve` method.

exported in the GraphQLSchema object as the mutation.

```
module.exports = new GraphQLSchema({
  query: RootQuery, 
  mutation
})
```

Request:

```
mutation {
  addUser(firstName: "Dan", age: 99){
    id
    firstName
    age
  }
}
```