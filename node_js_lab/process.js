// similar to c, index 0 is where node (software) is getting exectued from, first arg
// index 1 is the script its executing 
// and the proceeding arguments are what comes after the two
console.log(global.process.argv);

const fn = process.argv[2];
const ln = process.argv[3];
console.log(`Hello ${fn} ${ln}`);