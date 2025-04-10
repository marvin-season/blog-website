async function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(ms), ms));
}
console.log(await sleep(1000));
await sleep(2000);
console.log(2);