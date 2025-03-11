
const PersonForm = ({ addContact, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addContact}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange} />
            
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
            
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  )
}

export default PersonForm