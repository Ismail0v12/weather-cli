import axios from "axios";
import { DICTIONARY, getValue } from "./storage.service.js";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};



const decodeCityToLat = async (city) => {
    const token = await getValue(DICTIONARY.token);
    const { data } = await axios("https://api.openweathermap.org/geo/1.0/direct", {
        params: {
            q: city,
            appid: token
        }
    });

    if (data.length) {
        const transformData = data.find(item => item.name.toLowerCase() === city.toLowerCase());
        return {
            lat: transformData.lat,
            lon: transformData.lon
        };
    } else {
        return undefined
    }
}

const getWeather = async (city) => {
    const token = await getValue(DICTIONARY.token);
    if (!token?.length) {
        throw new Error("Token was not provided, please provide token by -t [API_KEY]");

    }
    const lonLat = await decodeCityToLat(city);
    if (!lonLat) {
        throw new Error("Invalid city name");
    }

    const { data } = await axios("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            lat: lonLat.lat,
            lon: lonLat.lon,
            appid: token,
            units: "metric",
            lang: "ru"
        }
    });

    return data;
}


export { getWeather, decodeCityToLat, getIcon };