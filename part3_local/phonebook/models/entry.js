// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
require('dotenv').config();

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to database successfully');
    })
    .catch(() => {
        console.log('Error connecting to MongoDB database');
    });

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        maxlength: 8,
        required: true,
        validate: {
            validator: function(input) {
                return /\d{2}-[0-9]+/.test(input) || /\d{3}-[0-9]+/.test(input);
            },
        }
    }
});

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Entry', entrySchema);