console.log(1);
setTimeout(() => {
    console.log(4);
})
queueMicrotask(() => {
    console.log(3);
})
console.log(2);