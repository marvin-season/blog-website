const data = {
    arr: [],
};
data.arr.push({
    id: 1,
    value: 1,
});

const existed = data.arr.find(item => item.id === 1);
if(existed) {
    console.log('existed', existed);
    data.arr = [...data.arr, existed];
}
console.log(data);