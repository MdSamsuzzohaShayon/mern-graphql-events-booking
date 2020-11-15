const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Event = require('./models/Event');
const User = require('./models/User');


const app = express();
// const events = [];


// THERE IS NOT CREATOR OR USER WITH THIS ID OF EVENT 
// Event.find().populate().then(result => console.log(result));


const events = eventsIds => {
    // $in UNDERSTOOD BY MONGODB 
    return Event.find({ _id: { $in: eventsIds } })
        .then(events => {
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    creator: user.bind(this, event.creator)
                }
            })
        })
        .catch(err => {
            throw err;
        });
    ;
}

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return {
                ...user._doc,
                _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvents)
            }
        })
        .catch(err => {
            throw err;
        });
}


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
        creator: User!
    }


    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput{
        email: String!
        password: String!
    }


    type RootQuery{
        events: [Event!]!
    }

    type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
    
    `),






    // RESOLVER 
    rootValue: {
        // QUERY FOR GETTING EVENTS 
        events: () => {
            // return events;
            return Event.find()
                // .populate('creator')
                .then(events => {
                    // console.log("Events: ", events);
                    return events.map(event => {
                        return {
                            ...event._doc,
                            _id: event.id,
                            creator: user.bind(this, event._doc.creator)
                        }

                    })
                })
                .catch(err => console.log(err));
        },







        // MUTATION  FOR CREATING EVENTS 
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

            // CREATING NEW USER FROM API FORM 
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: "5fb0eb0fd131515b6015e398"
            });
            // DECLARE A UNINITILIZED VARIABLE SO LATTER ON WE CAN USE IT
            let createEvent;

            // SAVING A NEW EVENT AND REFERNAL USER SAVING 
            return event.save()
                .then(result => {
                    createEvent = { ...result._doc, _id: result._doc._id.toString(), creator: user.bind(this, result._doc.creator) };
                    return User.findById("5fb0eb0fd131515b6015e398");  // RETURNING USER FROM HERE - UP NEXT IN THEN PROMISE IT CHECK IF USER IS EXIST OR NOT
                    // console.log(result);
                })
                .then(user => {
                    // SEARCHING USER FROM DATABASE AND CHECKING THE USER IS NOT EXIST IT WILLRETURN AN ERROR
                    if (!user) {
                        // IT THERE IS ANY ERROR IT WILL SKIP ALL THEN BLOCK AND GO FOR CATCH BLOCK
                        throw new Error("User not found");
                    }
                    // PUSH IS OBJECT OF MONGOOSE 
                    user.createdEvents.push(event);
                    // UPDATE EXISTING USER AND SAVING ONLY THE EVENTS IN USER
                    return user.save();
                })
                .then(result => {
                    return createEvent;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },



        // MUTATION FOR CREATING USER 
        createUser: args => {
            return User.findOne({ email: args.userInput.email }).then(user => {
                // CHECK FOR IT THERE IS ALREADY A USER OR NOT 
                if (user) {
                    // IT THERE IS ANY ERROR IT WILL SKIP ALL THEN BLOCK AND GO FOR CATCH BLOCK
                    throw new Error("User exist alreaddy");
                }
                // USING BCRYPT JS FOR HASHING THE PASSWORD 
                return bcrypt.hash(args.userInput.password, 12);
            })
                .then(hashedPassword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    // RETURNING USER WILL ALL INFORMATIONS EXCEPT PASSWORD 
                    return { ...result._doc, password: null, _id: result.id }
                })
                .catch(err => { throw err; });

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
