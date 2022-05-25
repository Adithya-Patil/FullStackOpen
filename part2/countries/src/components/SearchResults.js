import CountryDetails from "./CountryDetails"

const SearchResults = (props) => {

    let counter = 0;
    let singleCountry = '';
    for (let i = 0; i < props.countries.length; i++) {
        if (props.countries[i].toLowerCase().includes(props.newSearch.toLowerCase())) {
            counter++;
            singleCountry = props.countries[i];
        }
    }

    const onShowClick = (name) => {
        return(() => {
            props.setCountryInput(name);
        });
    }

    if (counter >= 10) {
        return <p>Too many matches, specify another filter</p>;
    }

    if (counter === 1) {
        return <CountryDetails name={singleCountry}/>;
    }

    return (
        <ul>
          {props.countries.filter(name => 
            name.toLowerCase().includes(props.newSearch.toLowerCase())).map(name => {
                    return <li key={name}>{name} <button onClick={onShowClick(name)}>Show</button></li>
                }
            )
        }
        </ul>
    );
}

export default SearchResults;