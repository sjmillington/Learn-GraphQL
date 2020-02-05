### RESTful Routing

#### Review

Given a collecton of records on a server, there should be a uniform URL and HTTP req method used to utilize that collection.

CRUD

```
/posts POST - Creates a new post
/posts GET - Get all posts
/posts/14 GET - Get post 14
/posts/15 PUT - Update post 15
/posts/18 DELETE - Delete post 18
```

Generalized: `/<name>/:id`

Nested: `/users/23/posts/14` 

#### Shortcomings of RESTful Routing

Becomes convoluted as data becomes more nested.

E.g. List of friends on facebook, each with a company and position. 

Data needed:

- User image
- User name
- Company Name 
- Position Name

Would need 3 schemas:

Users & Company & Positions.

##### We could make the requests seperately:

To get the friends, the path would be:

`/users/1/friends/...?`

If the first friend returned id 23, we could query that seperately:

`/users/23/companies` or `/users/23/positions` 

And for the second friend, id 45:

`/users/45/companies` and `/users/45/positions`

This is a lot of HTTP requests!

##### As one URL


`/users/23/friends/companies`

This is a very custom endpoint... more coding involved.

or

`/users/23/friends_with_companies_and_positons`

This is breaking restful conventions!

These both also return loads of data that we don't care about.. we might only need the name of the company.