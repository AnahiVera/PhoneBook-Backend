import { useState, useEffect } from 'react'
import Name from './Name'
import Filter from './Filter'
import PersonForm from './PersonForm'
import contactService from './services/contacts'
import Notification from './notification'
import ErrorNotification from './errorNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
      })
      .catch(error => {
        setErrorMessage(
          `Error`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }, [])
  console.log('render', persons.length, 'contacts')




  const addContact = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    const existingContact = persons.find(person => person.name === newName)
    //checks if the name already exists | Case sensitive
    if (existingContact) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        contactService
          .update(existingContact.id, newObject)
          .then(updatedContact => {
            setPersons(persons.map(person => person.id !== existingContact.id ? person : updatedContact))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Updated contact ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })        
    } else {
      contactService
        .create(newObject)
        .then(createdContact => {
          setPersons(persons.concat(createdContact))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added contact ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(
            `Error contact cannot be added`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })  
    }
  }

  const handleDelete = (id) => {
    console.log('delete', id)
    contactService
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />


      <h2>Add a new contact</h2>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />


      <h2>Numbers</h2>

      <ul> {personsToShow.map(person =>
        <Name key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)} />)}
      </ul>



      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
    </div>
  )
}

export default App