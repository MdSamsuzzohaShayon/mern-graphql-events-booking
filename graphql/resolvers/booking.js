const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const { transformBooking, transformEvent } = require('./merge');









// RESOLVERS FOR QUERY AND MUTATION 
module.exports = {



    // BOOKING QUUERY
    // FOR SHOWING ALL BOOKINGS USER NEED TO BE AUTHENTICATED 
    bookings: async (args, req) => {
        // CHECK FOR AUTHENTICATION 
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking)
            })
        } catch (err) {
            throw err;
        }
    },








    // MUTATION FOR BOOK EVENT 
    // IN SCHEMA WE DEFINE BOOK EVENT RESOLVER
    // FOR BOOKING EVENTS USER NEED TO BE AUTHENTICATED 
    bookEvent: async (args, req) => {
        // CHECK FOR AUTHENTICATION 
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);
    },











    // MUTATION FOR CANCEL BOOKING 
    // FOR CANCEL BOOKINGS USER NEED TO BE AUTHENTICATED 
    cancelBooking: async (args, req)  => {
        // CHECK FOR AUTHENTICATION 
        if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }
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