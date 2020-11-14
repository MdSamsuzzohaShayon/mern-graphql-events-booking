const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');


const app = express();



// MIDDLEWARE 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// https://graphql.org/learn/serving-over-http/#graphiql
// THIS IS ONLY ONE END POINT WHERE ALL THE REQUEST SENT 
app.use('/graphql', graphqlHttp({
    // MIDDLEWARE FUNCTION 
    // CONFIGURE GRAPHQL API

    // https://graphql.org/graphql-js/utilities/#buildschema
    // FOR FETCH DATA WE NEED QUERY AND FOR CHANGE DATA WE NEED MUTATION 
    schema: buildSchema(`
    type RootQuery{
        events: [String!]!
    }
    type RootMutation{
        createEvent(name: String): String
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
    
    `),
    rootValue: {
        events: (args) => {
            return ['Romantic', 'Cooking', "selling", "Coding"]
        },
        createEvent: (args)=>{
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));







const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running on : ' + port));