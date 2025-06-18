function sleep(ms=1000) {
    return new Promise(res => setTimeout(() => {
        res(console.log(`Natija: Kod ${ms} ms ishga tushdi`)
        )
    },ms))
}
function random(start, stop) {
    return Math.floor(Math.random()*stop+start)
}
class Person{
    constructor(name, age) {
        this.name = name,
        this.age=age
    }
    get fullName() {
        return this.name
    }
    get yoshi() {
        return this.age
    }
    getInfo() {
        console.log(`Ismi: ${this.fullName}\nYoshi: ${this.yoshi}`)
    }
}
const person=new Person()

module.exports={sleep,random,Person}