// require('dotenv').config();
const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');



const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require("./graphql/resolvers/index");
const isAuth = require('./middleware/is-auth');



const app = express();
// const events = [];


// THERE IS NOT CREATOR OR USER WITH THIS ID OF EVENT 
// Event.find().populate().then(result => console.log(result));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo db is connected");
    })
    .catch(err => console.log(err));


// MIDDLEWARE 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next();
});


// AUTHENTICATE USER - USE MATA DATA 
// IT ALWAYS LET'S EVERY REQUEST LET THOUGH (NEVER SENT AN ERROR)
// BUT JUST ADD THE INFORMATIONS WHETHER IT'S AUTHENTICATED OR AN UNAUTHENTICATED REQUEST 
// SO WE CAN RUN THIS MIDDLEWARE IN EVERY INCOMING REQUEST 
app.use(isAuth);




// https://graphql.org/learn/serving-over-http/#graphiql
// THIS IS ONLY ONE END POINT WHERE ALL THE REQUEST SENT 
app.use('/graphql', graphqlHttp({
    // MIDDLEWARE FUNCTION 
    // CONFIGURE GRAPHQL API




    // Scalar types# A GraphQL object type has a name and fields, but at some point those fields have to resolve to some concrete data
    // https://graphql.org/learn/schema/#scalar-types


    // https://graphql.org/graphql-js/utilities/#buildschema
    // FOR FETCH DATA WE NEED QUERY AND FOR CHANGE DATA WE NEED MUTATION 
    schema: graphQLSchema,






    // RESOLVER 
    rootValue: graphQLResolvers,




    graphiql: true
}));







const port = process.env.PORT || 8000;


app.listen(port, () => console.log('Server is running on : ' + port));
