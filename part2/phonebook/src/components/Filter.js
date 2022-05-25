const Filter = (props) => {
    return (
    <div>
          Filter shown with <input value={props.newSearch} onChange={props.handleNewSearch}/>
    </div>
    )
  }

  export default Filter