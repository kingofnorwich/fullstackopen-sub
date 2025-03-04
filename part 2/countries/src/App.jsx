import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Search = ({ searchTerm, handleSearch }) => (
  <label>
    Search
    <input value={searchTerm} onChange={handleSearch} />
  </label>
);

const CountriesFiltered = ({
  countries,
  searchTerm,
  handleShowCountry,
  weather,
}) => {
  if (searchTerm === "") return null;

  return (
    <>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <CountryDetails
          country={countries[0]}
          weather={weather[countries[0].name.common]}
        />
      ) : countries.length === 0 ? (
        <p>No matches found</p>
      ) : (
        countries.map((c) => (
          <p key={c.cca3}>
            {c.name.common}{" "}
            <button onClick={() => handleShowCountry(c)}>Show</button>
          </p>
        ))
      )}
    </>
  );
};

const CountryDetails = ({ country, weather }) => (
  <>
    <h3>{country.name.common}</h3>
    <p>
      Capital: <strong>{country.capital}</strong>
    </p>
    <p>
      Area:{" "}
      <strong>
        {country.area >= 1000000 ? (
          <>
            {(country.area / 1000000).toFixed(2)} million km<sup>2</sup>
          </>
        ) : (
          <>
            {country.area} km<sup>2</sup>
          </>
        )}
      </strong>
    </p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages).map((lang, index) => (
        <li key={index}>{lang}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`${country.name.common} flag`}
      width="150"
    />
    {weather && (
      <>
        <h3>Weather</h3>
        <p>
          <strong>Wind Speed:</strong> {weather.wind.speed} m/s
        </p>
        <p>
          <strong>Temperature:</strong> {weather.main.temp} °C
        </p>
        <p>
          <strong>Humidity:</strong> {weather.main.humidity} %
        </p>
        <p>
          <strong>Cloudiness:</strong> {weather.clouds.all} %
        </p>
        <p>
          <strong>Weather Description:</strong> {weather.weather[0].description}
        </p>
      </>
    )}
  </>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCountry, setShowCountry] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherObj = {};
      for (let country of countries) {
        if (country.capital) {
          try {
            const data = await weatherService.getWeather(country.capital);
            weatherObj[country.name.common] = data;
          } catch (error) {
            console.log(
              `Error fetching weather for ${country.name.common}:`,
              error
            );
          }
        }
      }
      setWeatherData(weatherObj);
    };

    if (countries.length > 0) {
      fetchWeatherData();
    }
  }, [countries]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setShowCountry(null);
  };

  const filteredCountries =
    searchTerm === ""
      ? []
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(searchTerm)
        );

  const handleShowCountry = (country) => {
    setShowCountry(country);
  };

  return (
    <>
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      {showCountry ? (
        <CountryDetails
          country={showCountry}
          weather={weatherData[showCountry.name.common]}
        />
      ) : (
        <CountriesFiltered
          countries={filteredCountries}
          searchTerm={searchTerm}
          handleShowCountry={handleShowCountry}
          weather={weatherData}
        />
      )}
    </>
  );
};

export default App;
