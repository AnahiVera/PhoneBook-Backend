
const Filter = ({ filter, setFilter }) => {

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }
  return (
    <div>
      Filter Contact <input value={filter} onChange={handleFilter} />
    </div>
  )
}
export default Filter