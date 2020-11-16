const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// EVERY BOOKING HAS ONE EVENT WHICH IS BOOKED AND ONE USER WHO BOOKED THE EVENT 
const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "event"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }

    // TIMESTAMP IS BY MONGOOSE - IT WILL ADD CREATED AT AND UPDATED AT FIELD 
}, {timestamps: true});


module.exports = mongoose.model('booking', bookingSchema);