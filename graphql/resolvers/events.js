const Event = require("../../models/Event");
const { transformEvent} = require('./merge');













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


    }



}