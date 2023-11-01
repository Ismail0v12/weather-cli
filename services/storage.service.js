import { promises } from "fs";
import { homedir } from "os";
import { join, sep } from "path";

const filePath = join(homedir() + `${sep}weather-data.json`);

const DICTIONARY = {
    token: "token",
    city: "city"
}

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data));
};

const getValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key]
    };
    return undefined;
}

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};

export { saveKeyValue, isExist, getValue, DICTIONARY };