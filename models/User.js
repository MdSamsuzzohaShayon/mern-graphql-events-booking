const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // EVENTS WILL BE AN ARRAY
    createdEvents: [
        // THIS IS THE SAMPLE. HOW SINGLE ELEMENT WILL LOOK LIKE IN A ARRAY
        {
            type: Schema.Types.ObjectId,
            ref: 'event' // SET UP RELATION - REQUIED TO FETCH DATA
        }
    ]
});

module.exports = mongoose.model('user', userSchema);

