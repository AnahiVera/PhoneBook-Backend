


const Name = ({ name, number, handleDelete}) => {
  
  return (
    <div>
      <li>{name}, {number}</li>
      <button onClick={handleDelete}>delete</button>

    </div>



  )
}

export default Name