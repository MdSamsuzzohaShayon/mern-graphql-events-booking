const bcrypt = require('bcryptjs');


const Event = require("../../models/Event");
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const {dateToString} = require('../../helper/date');







// RETURNING DETAILS OF THE RESULT 
const transformEvent = event => {
    return {
        // SPRAGE EVENT DOC 
        ...event._doc,
        // REPLACE ID 
        _id: event.id,
        // REPLACE DATE 
        date: dateToString(event._doc.date),
        // REPLACE USER 
        creator: user.bind(this, event.creator)
    }
}










// EXTRA FUNCTION FOR HELPING 
// FETCHING EVENTS INFORMATION FROM DATABASE USING EVENT ID 
const events = async eventsIds => {
    try {
        // $in UNDERSTOOD BY MONGODB 
        const events = await Event.find({ _id: { $in: eventsIds } })
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;

    }
}

// EXTRA FUNCTION FOR HELPING 
// FETCHING USERS INFORMATION FROM DATABASE USING USER ID 
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




// EXTRA FUNCTION FOR HELPING 
// FETCHING SINGLE EVENTS INFORMATION FROM DATABASE USING EVENT ID 
const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event)
    } catch (err) {
        throw err;
    }
}













// RESOLVERS FOR QUERY AND MUTATION 
module.exports = {


    // QUERY FOR GETTING EVENTS 
    events: async () => {
        try {
            const events = await Event.find();
            // console.log("Events: ", events);
            return events.map(event => {
                return transformEvent(event)

            })
        } catch (err) {
            throw err;

        }
    },








    // BOOKING QUUERY
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    user: user.bind(this, booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event),
                    createdAt: dateToString(booking._doc.createdAt),
                    updatedAt: dateToString(booking._doc.updatedAt)
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
            date: dateToString(args.eventInput.date),
            creator: "5fb159c9f80f5535bb8293cc"
        });
        // DECLARE A UNINITILIZED VARIABLE SO LATTER ON WE CAN USE IT
        let createEvent;


        try {
            // SAVING A NEW EVENT AND REFERNAL USER SAVING 
            const result = await event.save();
            createEvent = transformEvent(result);
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
    },









    // MUTATION FOR BOOK EVENT 
    // IN SCHEMA WE DEFINE BOOK EVENT RESOLVER
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: "5fb159c9f80f5535bb8293cc",
            event: fetchedEvent
        });
        const result = await booking.save();
        return {
            ...result._doc,
            _id: result.id,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
            createdAt: dateToString(result._doc.createdAt),
            updatedAt: dateToString(result._doc.updatedAt),
        }
    },






    // MUTATION FOR CANCEL BOOKING 
    cancelBooking: async args => {
        console.log("this mutation is working");
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            // const booking = await Booking.findById(args.bookingId).populate('event');
            console.log("booking: ", booking);
            const event = transformEvent(booking.event);
            console.log("events: ", event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;

        } catch (err) {
            throw err;

        }
    }



}