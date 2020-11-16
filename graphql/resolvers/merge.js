const Event = require('../../models/Event');
const User = require('../../models/User');
const { dateToString } = require('../../helper/date');


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



const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}






exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;


// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;