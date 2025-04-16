const object = {
    name: "John",
    age: 99,
};

Object.prototype[Symbol.iterator] = function* () {
    const keys = Object.keys(this);
    console.log("this", this);
    yield* keys.map((key) => {
        return this[key];
    });
};

Object.defineProperty(object, "addr", {
    value: "Main St",
    enumerable: false,
});


for (const element of object) {
    console.log(element);
}
