const os=require('node:os')
console.log(os.userInfo().username);
console.log(os.userInfo());
console.log("RAM:",os.totalmem()/1024);
console.log(os.uptime()," sek");

