# MERN Stack GraphQL Event Booking API

 - [Tutorial](https://www.youtube.com/watch?v=7giZGFDGnkc&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_)

 - In Graph ql we always need to send post request (there is no get request)

 ![Graph QL](screenshots/graphql_1.png)

 ![Graph QL](screenshots/graphql_2.png)

 ![Graph QL](screenshots/graphql_3.png)

 ![Graph QL](screenshots/graphql_4.png)

 ![Graph QL](screenshots/graphql_5.png)

 ![Graph QL](screenshots/graphql_6.png)

 - Go go __http://localhost:3000/graphql__ and make those query and mutation

 ![Graph QL](screenshots/graphql_7.png)

 ![Graph QL](screenshots/graphql_8.png)

 - Query for particular data

 ![Graph QL](screenshots/graphql_9.png)

 - Add an event and return that event (mutation)

 ![Graph QL](screenshots/graphql_11.png)

 - Query recent created event

 ![Graph QL](screenshots/graphql_12.png)

 - Creating first event and save to database

 ```
 mutation {
  createEvent(eventInput: {title: "graph ql post one", description: "this is post description", price: 9.99, date: "2020-11-14T17:44:26.334Z"}) {
    title
    description
  }
}
 ```

 - Query data from database

 ```
 query{
  events{
    title
    _id
  }
}
 ```

 - Mutation for creating user

 ```
 mutation{
  createUser(userInput:{email:"mbappe@test.com", password:"1234"}){
    email
    password
  }
}
 ```

 - Mutation  for user - creating events with relation of user

 ```
 mutation{
  createEvent(eventInput: {title: "testing created event", description:"this is a test", price: 255, date:"2020-11-15T08:38:47.198Z" }){
    title
    description
  }
}
 ```






