// eslint-disable-next-line no-undef
require('express');
// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const cors = require('cors');
// eslint-disable-next-line no-undef
require('dotenv').config();
// eslint-disable-next-line no-undef
const Entry = require('./models/entry');

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.get('/api/persons', (request, response) => {
    Entry.find({}).then(list => {
        response.json(list);
    });
});

app.get('/info', (request, response) => {
    Entry.find({}).then(list => {
        response.send(
            `<div>
                <p>Phonebook has info for ${list.length} people</p>
                <p>${new Date()}</p>
            </div>`
        );
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id)
        .then(entry => {
            if (entry) {
                response.json(entry);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));

});

app.delete('/api/persons/:id', (request, response, next) => {
    Entry.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch(error => {
            next(error);
        });
});

app.put('/api/persons/:id', (request, response, next) => {
    const entry = {
        name: request.body.name,
        number: request.body.number,
    };

    Entry.findByIdAndUpdate(request.params.id, entry, { new: true, runValidators: true })
        .then(updatedEntry => {
            response.json(updatedEntry);
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const entry = new Entry( { name: request.body.name, number: request.body.number } );

    entry.save()
        .then(result => {
            response.json(result);
        })
        .catch(error => {
            next(error);
        });
});

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Misformatted ID' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};

app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});