const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');


const app = express();
const events = [];



// MIDDLEWARE 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// https://graphql.org/learn/serving-over-http/#graphiql
// THIS IS ONLY ONE END POINT WHERE ALL THE REQUEST SENT 
app.use('/graphql', graphqlHttp({
    // MIDDLEWARE FUNCTION 
    // CONFIGURE GRAPHQL API




    // Scalar types# A GraphQL object type has a name and fields, but at some point those fields have to resolve to some concrete data
    // https://graphql.org/learn/schema/#scalar-types


    // https://graphql.org/graphql-js/utilities/#buildschema
    // FOR FETCH DATA WE NEED QUERY AND FOR CHANGE DATA WE NEED MUTATION 
    schema: buildSchema(`

    type Event{
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
    }


    type RootQuery{
        events: [Event!]!
    }

    type RootMutation{
        createEvent(eventInput: EventInput): Event
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
    
    `),





    rootValue: {
        events: (args) => {
            return events;
        },
        createEvent: (args)=>{
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            console.log("Args: ", args);
            console.log("event object: ", event);
            events.push(event);
            return event;
        }
    },
    graphiql: true
}));







const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running on : ' + port));