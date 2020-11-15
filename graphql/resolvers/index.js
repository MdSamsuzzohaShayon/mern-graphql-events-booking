const bcrypt = require('bcryptjs');


const Event = require("../../models/Event");
const User = require('../../models/User');

const events = async eventsIds => {
    try {
        // $in UNDERSTOOD BY MONGODB 
        const events = await Event.find({ _id: { $in: eventsIds } })
        events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                creator: user.bind(this, event.creator)
            };
        });
        return events;
    } catch (err) {
        throw err;

    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    } catch (err) {
        throw err;

    }
}


module.exports = {
    // QUERY FOR GETTING EVENTS 
    events: async () => {
        try {
            const events = await Event.find();
            // console.log("Events: ", events);
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                }

            })
        } catch (err) {
            throw err;

        }
    },







    // MUTATION  FOR CREATING EVENTS 
    createEvent: async args => {
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
            creator: "5fb159c9f80f5535bb8293cc"
        });
        // DECLARE A UNINITILIZED VARIABLE SO LATTER ON WE CAN USE IT
        let createEvent;


        try {
            // SAVING A NEW EVENT AND REFERNAL USER SAVING 
            const result = await event.save();
            createEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById("5fb159c9f80f5535bb8293cc");  // RETURNING USER FROM HERE - UP NEXT IN THEN PROMISE IT CHECK IF USER IS EXIST OR NOT
            // console.log(result);

            // SEARCHING USER FROM DATABASE AND CHECKING THE USER IS NOT EXIST IT WILLRETURN AN ERROR
            if (!creator) {
                // IT THERE IS ANY ERROR IT WILL SKIP ALL THEN BLOCK AND GO FOR CATCH BLOCK
                throw new Error("User not found");
            }
            // PUSH IS OBJECT OF MONGOOSE 
            creator.createdEvents.push(event);
            // UPDATE EXISTING USER AND SAVING ONLY THE EVENTS IN USER
            await creator.save();
            return createEvent;
        } catch (err) {
            throw err;
        }


    },



    // MUTATION FOR CREATING USER 
    createUser: async args => {
        try {
            const existUser = await User.findOne({ email: args.userInput.email })
            // CHECK FOR IT THERE IS ALREADY A USER OR NOT 
            if (existUser) {
                // IT THERE IS ANY ERROR IT WILL SKIP ALL THEN BLOCK AND GO FOR CATCH BLOCK
                throw new Error("User exist alreaddy");
            }
            // USING BCRYPT JS FOR HASHING THE PASSWORD 
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();
            // RETURNING USER WILL ALL INFORMATIONS EXCEPT PASSWORD 
            return { ...result._doc, password: null, _id: result.id }
        } catch (err) {
            throw err;
        }

    }
}