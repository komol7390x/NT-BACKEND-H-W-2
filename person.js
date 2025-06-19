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
module.exports={Person}