const Persons = (props) => {
    return (
      <div>
        {props.persons.filter(person => {
          return person.name.toLowerCase().includes(props.newSearch.toLowerCase())
        }).map(person => {
            return <p key={person.name}>{person.name} {person.number} <button onClick={props.removePerson(person)}>delete</button></p>;
        })}
      </div>
    )
}

export default Persons;