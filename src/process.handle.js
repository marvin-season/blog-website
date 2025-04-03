function throttle(func, timeout = 500) {
    let timer = null
    return function(...props) {
        if(timer) {
            return
        }
        timer = setTimeout(() => {
            func(...props);
            timer = null
        }, timeout)
    }
}
function func() {
    console.log(Date.now())
}
const test = throttle(func)
setInterval(test)

