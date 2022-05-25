const Search = (props) => {
    return (
        <div>
            <input value={props.countryInput} onChange={props.handleCountryInputChange} />
        </div>
    );
}

export default Search;