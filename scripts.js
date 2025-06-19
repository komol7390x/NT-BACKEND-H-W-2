const { sleep } = require("./sleep");
const { random } = require("./random");
const {  Person } = require("./person");
async function res() {
    // -------------------------------------------
    // Task-1
    // await sleep(2000);
    // -------------------------------------------
    // Task-2
    // console.log(random(100,999));
    // -------------------------------------------
    // Task-3
    const info = new Person('Komol', 27);
    // info.getInfo()
    // -------------------------------------------
    // Task-4
    // await sleep(random(100, 1000));
    info.getInfo()
}
res();
