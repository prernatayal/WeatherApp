import React, { useState } from 'react';
import './WeatherApp.css';
import { useDebounceFunction } from '../CommonFunctions/Debounce';

const api = {
    key: "d6564e0dc223bd0343a59b2c55669928",
    base: "https://api.openweathermap.org/data/2.5/"
}

const WeatherApp = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [weather, SetWeather] = useState('');
    const [error, setError] = useState(false);

    const debounce = useDebounceFunction(
        (callback) => callback(),
        1000
    );


    const dateBuilder = (date) => {

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[date.getDay()];
        let dates = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        return (`${day} ${dates} ${month} ${year}`)

    }

    const handleSearch = (e) => {
        let value = e.target.value;
        if (value) {
            setSearchTerm(value);
            debounce(() => fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    if (result?.id) {
                        SetWeather(result);
                        setError(false);
                    }
                    else {
                        setError(true);
                        SetWeather("");
                    }
                    console.log(result);
                }));
        }
        else {
            setSearchTerm("");
            SetWeather("");
            setError(false);
        }
    }


    return (
        <div className={weather && weather?.main !== "" ? 'app warm' : 'app'}>
            <main>
                <div className="search-box">
                    <input type="search" placeholder='Search City...' className='search-bar' value={searchTerm}
                        onChange={handleSearch} />
                </div>
                {weather && weather?.main !== "" ?
                    <React.Fragment>
                        <div className="location-box">
                            <div className="location">{weather?.name}, {weather?.sys?.country === "IN" ? "India" : weather?.sys?.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className='weather-box'>
                            <div className='temp'>{Math.round(weather?.main?.temp)}*C</div>
                            <p className='weather'>Humidity : {weather?.main?.humidity}</p>
                            <p className='weather'>Wind Spead : {weather?.wind?.speed}</p>
                            <div className='weather-desc'>Weather : {weather?.weather?.length > 0 ? weather?.weather[0]?.description : ""}</div>
                        </div>
                    </React.Fragment>
                    :
                    <div className='intro-box'>
                        <div className='text'>Weather App</div>
                    </div>
                }
                {error && searchTerm ?
                    <div className='error-box'>No Data Found</div>
                    : ""
                }
            </main>
        </div>
    );
}

export default WeatherApp;