NodeJs + MongoDB + GraphQL 
----------------------------------

Original version form [https://github.com/ailoitte/node-mongodb-graphql-starter](https://github.com/ailoitte/node-mongodb-graphql-starter)

Use with react-graphql frontend [https://github.com/sushingg/TechE-React](https://github.com/sushingg/TechE-React)

Table of Contents
-----------------
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Packages](#packages)
- [Query & Mutations](#query-mutation)

Features
--------

- **Local Authentication** using Email and Password
- MVC Project Structure
- GraphQL Mutations, Queries, Resolvers
- **Account Management**
     - Register
     - Login
     - Update profile
     - Profile Details
     - Add user address
     - Update Address
     - Remove Address
- Cron job scheduler
- JSON Web Token (JWT) Sign in


Prerequisites
-------------

- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 6.0+](http://nodejs.org)


Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash

# Install NPM dependencies
yarn install

# Then simply start your app
yarn dev
```

Packages
--------

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                           |
| express                         | Node.js web framework.                                                |
| body-parser                     | Express 4 middleware.                                                 |
| morgan                          | Express 4 middleware.                                                 |
| mongoose                        | MongoDB ODM.                                                          |
| nodemailer                      | Node.js library for sending emails.                                   |
| request                         | Simplified HTTP request library.                                      |
| lodash                          | Handy JavaScript utilities library.                                   |
| validator                       | Used in conjunction with express-validator.                           |                                        
| jsonwebtoken                    | An implementation of JSON Web Tokens.                                 |                                        
| mongoose-paginate               | MongoDB mongoose pagination                                           |                                        
| moment                          | JS date library- parsing,validating,manipulating,andformatting dates. |
| mime                            | Comprehensive MIME type mapping API based on mime-db module.          |
| firebase-admin                  | Push notification                                                     |
| aws-sdk                         | AWS client SDK                                                        |
| multer-s3                       | Upload multipart to S3                                                |
| winston                         | async logging library                                                 |
| cron                            | Cron job                                                              |
| nodemon                         | Automatically restart when your code changes


Query & Mutation
----------------

### ADD USER

```
mutation {
  addUser(name: "Sunil Kumar", email: "sunilkumar707@yahoo.in", mobileNumber:"8867371492", password: "123567"){
    id
    name
    email
    mobileNumber
  }
}
```

### UPDATE

```
mutation {
  updateUser(name: "Ravi Sanker"){
    id
    name
    email
    mobileNumber
  }
}
```

### LOGIN

```
mutation {
  loginUser(mobileNumber: "8867371492", password:"1234567") {
    id
    token
    name
    email
  }
}
```

### ADD ADDRESS

```
mutation {
  addUserAddress(street: ["s1", "s2"], 
    city:"Dehradun", 
    countryId: "IN", 
    addressType: "home",
    postcode:"23455"
  ) {
    id
    street
    city
    countryId
    landmark
    locality
    addressType
    postcode
  }
}
```

### UPDATE ADDRESS

```
mutation {
  updateUserAddress(id: "59e4d803d3528728b99b3c53",
    street: ["Nesh", "Indra Road"], 
    city:"Dehradun", 
    countryId: "IN", 
    addressType: "home",
    postcode:"234551"
  ) {
    id
    street
    city
    countryId
    landmark
    locality
    addressType
    postcode
  }
}
```

### DELETE ADDRESS

```
mutation {
  deleteUserAddress(
   id: "59e4dc6b875e8829539b20d7"
  ){
    message
  }
}
```

### ALL ADDRESS

```
query {
  me{
    address{
      street
      city
    }
  }
}
```


### ADDRESS BY ID

```
query {
  userAddress(id: "59e4d803d3528728b99b3c53"){
    id
    city
    street
    countryId
  }
}
}
```