const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');


const Event = require('./models/Event');


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
            // return events;
            return Event.find()
                .then(events => {
                    return events.map(event=>{
                        return {...event._doc, _id: event.id.toString() }
                        
                    })
                })
                .catch(err=> console.log(err));
        },
        createEvent: (args) => {
            /*
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
            // return event;
            */

            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            });

            return event.save()
                .then(result => {
                    console.log(result);
                    return { ...result._doc, _id:  result._doc._id.toString() };
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        }
    },
    graphiql: true
}));







const port = process.env.PORT || 3000;

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo db is connected");
    })
    .catch(err => console.log(err))

app.listen(port, () => console.log('Server is running on : ' + port));
