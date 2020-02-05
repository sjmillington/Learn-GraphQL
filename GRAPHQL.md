### GraphQL

Graph is refering to the data structure (nodes & edges)

#### Querying

```
query {
  user(id: "23"){
    friends {
      company {
        name
      }
    }
  }
}
```

Need to provide a `root query` as a point to jump into the data.

GraphQL can be used as a proxy, pulling together info from many different data stores.

#### Circular data

Circular relationships need to be created with closures `fields: () => ({})`

The query can then be circular too!

```
query{
  company(id: "2"){
    name
    users {
      firstName
      age
      id
      company {
        name
        users {
          firstName
        }
      }
    }
  }
}
```

#### Named Queries

```
query fetchCompanies {
  ...
}

```

#### Multiple Queries on same root


```
query fetchCompanies {
  apple: company(id: "1"){
    ...
  }
  company(id: "2"){

  }
}
```

This names the keys in the result JSON, so we don't have duplicates.

#### Query Fragments

These are re-usable lists of properties to return

```
fragment userDetails on User{
  firstName
  age
  id
}

fragment companyDetails on Company{
  id
  name
  description
  users{
    ...userDetails
  }
}

query fetchCompany{
  company(id: "2"){
    ...companyDetails
  }
}

```

The `on ..` does some type checking.

#### Requests

Nothing library specific about the query. It's just the stringified query that's being sent.