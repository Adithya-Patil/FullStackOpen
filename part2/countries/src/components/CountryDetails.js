import axios from "axios"
import { useEffect, useState } from "react";
import LanguageList from "./LanguageList";

const CountryDetails = ( { name } )=> {

    const [countryInfo, setCountryInfo] = useState({
        0: {
            name: {common: ''},
            capital: [''],
            area: 0,
            languages: [''],
            flags: {png: ''},
            capitalInfo: {latlng: [0, 0]}
        }
    });

    const [weatherInfo, setWeatherInfo] = useState({
        main: {temp: 0},
        wind: {speed: 0},
        weather: [{icon: '10d'}]
    });

    useEffect(() => {
        const url = `https://restcountries.com/v3.1/name/${name}`;
        axios
            .get(url)
            .then(response => {
                setCountryInfo(response.data);
            });
    }, [name]);

    useEffect(() => {
        const url = "https://api.openweathermap.org/data/2.5/weather?lat="
            .concat(countryInfo[0].capitalInfo.latlng[0])
            .concat("&lon=")
            .concat(countryInfo[0].capitalInfo.latlng[1])
            .concat("&units=metric&appid=")
            .concat(process.env.REACT_APP_API_KEY);

        axios
            .get(url)
            .then(response => {
                setWeatherInfo(response.data);
            });
    }, [countryInfo]);

    return (
        <div>
            <h1>{countryInfo[0].name.common}</h1>

            <p>Capital: {countryInfo[0].capital[0]}</p>
            <p>Area: {countryInfo[0].area}</p>

            <h3>Languages:</h3>

            <LanguageList languages={countryInfo[0].languages}/>

            <img src={countryInfo[0].flags.png} alt="new" />
            
            
            <h3>Weather in {countryInfo[0].capital[0]}</h3>
            <p>Temperature: {weatherInfo.main.temp} Celsius</p>

            <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="new" />

            <p>Wind: {weatherInfo.wind.speed} m/s</p>

        </div>
    );
}

export default CountryDetails;