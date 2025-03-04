import axios from 'axios';

const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const apiKey = import.meta.env.VITE_SOME_KEY;

const getWeather = (capital) => {
    const url = `${baseUrl}?q=${capital}&appid=${apiKey}`;
    return axios.get(url).then(response => response.data);
};

export default { getWeather };
