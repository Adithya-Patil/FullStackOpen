import axios from "axios";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

function App() {
  const [countryList, setCountryList] = useState([]);

  const [countryInput, setCountryInput] = useState('');
  const handleCountryInputChange = event => setCountryInput(event.target.value);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryList(response.data.map(countryObj => {
          return countryObj.name.common
        }))
      })
  }, []);

  return(
    <div>
      <Search handleCountryInputChange={handleCountryInputChange} countryInput={countryInput}/>
      <SearchResults countries={countryList} newSearch={countryInput} setCountryInput={setCountryInput}/>
    
    </div>
  );
}

export default App;
