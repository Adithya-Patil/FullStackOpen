// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
    console.log('Please ensure that a password is included in the command line call');
}

// eslint-disable-next-line no-undef
const password = process.argv[2];
const url = `mongodb+srv://adithyapatil:${password}@cluster0.0is23.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log(url);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
});

const Entry = mongoose.model('Entry', entrySchema);

// eslint-disable-next-line no-undef
if (process.argv.length === 3) {

    console.log('Phonebook:');
    Entry.find({}).then(result => {
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`);
        });
        mongoose.connection.close();
    });

// eslint-disable-next-line no-undef
} else if (process.argv.length === 5) {
    const entry = new Entry({
        // eslint-disable-next-line no-undef
        name: process.argv[3],
        // eslint-disable-next-line no-undef
        number: process.argv[4]
    });

    entry.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
}