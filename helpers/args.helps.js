const getArgs = (args) => {
    const res = {};
    const [executor, file, ...rest] = args;
    rest.forEach((element, index, array) => {
        if (element.charAt(0) === "-") {
            if (index == array.length - 1) {
                res[element.substring(1)] = true;
            } else if (array[index + 1].charAt(0) != "-") {
                res[element.substring(1)] = array[index + 1];
            } else if (array[index + 1].charAt(0) == "-") {
                res[element.substring(1)] = true;
            }
        }
    });

    return res;
}

export { getArgs };