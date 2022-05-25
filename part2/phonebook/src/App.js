import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const handleNameChange = event => setNewName(event.target.value)

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = event => setNewNumber(event.target.value)

  const [newSearch, setNewSearch] = useState('')
  const handleNewSearch = event => setNewSearch(event.target.value)

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('error');

  const addPerson = event => {
    event.preventDefault();

    if (!persons.every(person => person.name !== newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.filter(person => person.name === newName)[0];
        phonebookService
          .updateEntry(personToUpdate.id, { name: newName, number: newNumber })
          .then(response => {
            phonebookService
              .getAll()
              .then(initialEntries => {
                setPersons(initialEntries);
            })

            setNotificationMessage( `${newName} was successfully updated in the phonebook`);
            setNotificationType('success');
            setTimeout(() => setNotificationMessage(null), 5000);

            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setNotificationMessage(`${newName} was removed from the phonebook`);
            setNotificationType('error');
            setTimeout(() => setNotificationMessage(null), 5000);
  
            phonebookService
              .getAll()
              .then(initialEntries => {
                setPersons(initialEntries);
            })
            
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      phonebookService
        .createEntry(newPerson)
        .then(response => {
          
          phonebookService
            .getAll()
            .then(initialEntries => {
              setPersons(initialEntries);
          })

          setNotificationMessage(`${newName} was successfully added to the phonebook`);
          setNotificationType('success');
          setTimeout(() => setNotificationMessage(null), 5000);

          setNewName('');
          setNewNumber('');
        })
    }
  }

  const removePerson = toDelete => {
    return function() {
      if (window.confirm(`Delete ${toDelete.name}?`)) {
        phonebookService
        .deleteEntry(toDelete)
        .then(response => {
          setPersons(persons.filter(person => person.id !== toDelete.id));
        })
        .catch(error => {
          setNotificationMessage(`${toDelete.name} was already removed from the phonebook`);
          setNotificationType('error');
          setTimeout(() => setNotificationMessage(null), 5000);

          phonebookService
            .getAll()
            .then(initialEntries => {
              setPersons(initialEntries);
          })
          
        })
      } 
    }
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries);
    })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} type={notificationType}/>

      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch}/>

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newSearch={newSearch} removePerson={removePerson}/>

    </div>
  )
}

export default App