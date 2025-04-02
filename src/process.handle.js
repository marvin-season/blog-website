function new_(func, ...params) {
    const obj = Object.create(func.prototype);
    const result = func.apply(obj, params);
    return typeof result === "object" ? result : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    console.log('this', this, Object.getPrototypeOf(this) === Person.prototype);
}

const person1 = new Person("张三", 13);
console.log("person1", person1);
const person2 = new_(Person, "张三", 12);
console.log("person2", person2);