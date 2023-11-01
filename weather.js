#!/usr/bin/env node

import { getArgs } from "./helpers/args.helps.js"
import { getIcon, getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { saveKeyValue, DICTIONARY, getValue } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token was not provided, please provide token by -t [API_KEY]");
        return;
    }
    try {
        await saveKeyValue(DICTIONARY.token, token);
        printSuccess("Token was saved successfully");
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError("Token was not provided, please provide token by -t [API_KEY]");
        return;
    }
    try {
        await saveKeyValue(DICTIONARY.city, city);
        printSuccess("City was saved successfully");
    } catch (e) {
        printError(e.message);
    }
}

const getForeCast = async () => {
    try {
        const city = await getValue(DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 401) {
            printError("Invalid API token")
        } else {
            printError(e.message);
        }
    }
}

const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.c) {
        return saveCity(args.c);
    }
    return getForeCast();
};

initCli()