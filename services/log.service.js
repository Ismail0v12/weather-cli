import chalk from "chalk"
import dedent from "dedent-js";

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + " " + message);
};

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + " " + error);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(" HELP ")}
          Без параметров - вывод погоды
          -c [CITY] для установки города  
          -t [API_TOKEN] для сохранения токена  
          -h для вывода помощи  
        `
    )
};

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
        ${icon}  ${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Скорость ветра: ${res.wind.speed}
    `)
}


export { printError, printHelp, printSuccess, printWeather };