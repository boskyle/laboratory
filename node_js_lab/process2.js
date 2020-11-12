
const grab = flag => {
    let rightOfFlag = process.argv.indexOf(flag) + 1;
    return process.argv[rightOfFlag];
}

const greeting = grab('--greeting');
const name = grab('--name');

console.log(` ${greeting} ${name}`);
