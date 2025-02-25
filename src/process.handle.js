const set = new Set()

function publish(data) {
  set.forEach((resolve) => {
    resolve(data)
  })
  set.clear()
}

async function subscribe() {
  const result = await new Promise((resolve) => {
    set.add(resolve)
  })
  console.log('subscriber', result)
  return subscribe()
}

subscribe()
subscribe()
let i = 0

setInterval(() => {
  publish(i++)
}, 1000)
